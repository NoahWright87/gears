# Gear Designer – Internal Dev Tool Specification

## Purpose

The Gear Designer is an internal, developer-only tool used to define the **visual geometry of a single gear** for an idle game.

It is not player-facing and exists solely to author reusable, scalable gear designs that:

* Render efficiently in 2D
* Scale cleanly to arbitrary sizes
* Visually interlock correctly with other gears
* Increase visual complexity by layer, not by size

The output of the designer is a **normalized gear definition** that can be rendered at any radius.

---

## Core Design Principles

* **2D only** (flat geometry, no lighting, no 3D extrusion)
* **Fully symmetric** (radial symmetry; no asymmetry or randomness)
* **Ratio-based geometry** (all dimensions expressed as % of gear radius)
* **Deterministic** (same inputs always produce the same shape)
* **Layer-driven complexity** (number of rings increases by layer)
* **Size-independent design** (gear size scales the design; it does not change it)

---

## Gear Structure Overview

A gear is composed of **concentric rings**, rendered from the center outward:

1. **Hub Ring** (center / axle)
2. **Inner Rings** (0 to N, defined by layer)
3. **Outer Ring** (teeth)

Each ring occupies a radial band defined by normalized ratios.

**Normalized radii (conceptual example):**

* `0.00` = center
* `hubOuterRatio`
* (inner rings...)
* `toothBaseRatio`
* `1.00` = tooth tips

---

## Global Gear Standards (Shared Across All Gears)

These values are consistent across all gear designs to ensure visual interlocking:

* `hubOuterRatio` – outer radius of the hub
* `toothBaseRatio` – radius where teeth begin
* `toothTipRatio` – outer radius of gear (always `1.0`)

Tooth shape parameters (global standards):

* `toothDensity` (teeth per unit circumference)
* `toothDepthRatio`
* `toothWidthRatio`

**Rule:** these values are not customized per individual gear design; they are shared standards.

---

## Layer-Defined Attributes

Each progression layer defines:

* `innerRingCount` (0 for lowest layer, increases with layer)
* Allowed cutout patterns for inner rings
* Allowed etching patterns

**Rule:** gear **size does not affect** `innerRingCount`.

---

## Ring Layout Rules

* Inner rings are **automatically and evenly spaced**
* No manual ring positioning
* Ring boundaries are derived automatically from:

  * `hubOuterRatio`
  * `toothBaseRatio`
  * `innerRingCount`

Each ring is defined by:

* `innerRadiusRatio`
* `outerRadiusRatio`

---

## Hub Ring

### Purpose

Represents the axle attachment point.

### Attributes

* `hubShape` (one of):

  * Circle
  * Square
  * Hexagon
  * Star
  * D-shaft
  * Keyed circle
* `hubOuterRatio` (global standard)
* `hubIsHollow` (boolean)

**Rule:** no cutouts or etching are applied to the hub ring.

---

## Inner Rings

### Purpose

Provide visual complexity and negative space while preserving structural plausibility.

### Rules

* Each inner ring uses **exactly one cutout pattern**
* All cutouts are **fully symmetric** (even repetition around the circle)
* No randomness

### Cutout Density (Not Count)

All repeating features are defined using **density per circumference**, not absolute counts.

* `featureCount = floor(circumference * density)`
* Apply min/max clamps for sanity (e.g., `minCount`, `maxCount`)

---

## Supported Cutout Patterns

Each pattern is parameterized, symmetric, and repeatable.

### Basic Shapes

* **Circular holes**
* **Elliptical holes** (horizontal or vertical)
* **Rectangular cutouts** (prefer rounded corners)

### Radial Patterns

* **Radial slots** (pill-shaped, oriented radially)
* **Arc cutouts** (remove curved segments within a ring band)
* **Spoke-based removal** (keep `N` solid spokes, remove the rest)

### Industrial Variants

* **Keyhole shapes** (circle + slot)
* **Trapezoidal / triangular windows** (rounded corners)
* **Scallops** (repeating “bite” shapes along ring edges)

---

## Structural Safety Rules (Prevent Impossible Gears)

Goal: avoid a “floating teeth ring” or disconnected geometry.

1. **Minimum Web Thickness**

   * Each ring must retain at least `minWebThicknessRatio` of its radial band as solid material.

2. **Guaranteed Connectivity**

   * Each ring must preserve at least `minBridgeCount` solid bridges.
   * For high layers, prefer **spoke-based** patterns that explicitly guarantee bridges.

3. **Cutout Clamping**

   * If density/size would violate web thickness or bridges, automatically reduce cutout size first, then density.

---

## Outer Ring (Teeth)

### Purpose

Defines mechanical identity and interlocking behavior.

### Rules

* Teeth occupy the band from `toothBaseRatio` to `toothTipRatio`.
* No cutouts allowed in the teeth band.
* Teeth use global tooth parameters:

  * `toothDensity`
  * `toothDepthRatio`
  * `toothWidthRatio`

---

## Etching / Surface Detail (Optional)

Etching adds visual richness without altering geometry.

Rules:

* Etching never removes material (no boolean subtraction)
* Etching never affects silhouette or connectivity
* Etching is symmetric and ratio-based

Supported etching types:

* Concentric grooves
* Radial hatch lines
* Subtle dot patterns (non-through)
* Engraved symbols / tier markings

Implementation: render as strokes/fills only.

---

## Output Format

Each gear design exports as a structured, size-independent definition (e.g., JSON) containing:

* `layerId`
* Hub definition
* Inner ring definitions (pattern + parameters)
* Etching definitions (optional)

Rendering code scales the design by applying a final radius.

---

## Explicit Non-Goals

* No 3D rendering
* No physics simulation
* No randomness
* No player interaction
* No manual geometry drawing
