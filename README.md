# Bezier Curve & Hodograph Visualization
# Overview

This project visualizes Bezier curves and their hodographs. Users can interact with the canvas to add, remove, and drag control points, which dynamically updates the Bezier curve and its hodograph.

# Project Structure

.gitignore
index.html
README.md
script.js
style.css

# Files
1. index.html
This file contains the HTML structure of the project.

Key Elements:
Container: A div with class container that holds the main content.
Title: An h1 element with the title "Визуализация на Безие крива и ходограф".
Instructions: A p element with instructions for interacting with the canvas.
Buttons: A div with class buttons containing a button to clear the canvas.
Canvas: A canvas element where the Bezier curve and hodograph are drawn.

2. style.css
This file contains the CSS styles for the project.

# Key Styles:

body: Centered text, custom font, radial gradient background.
.container: Centered container with max-width, padding, box-shadow, and rounded corners.
h1: Styled title with font size and weight.
p: Styled paragraph with font size and color.
.buttons: Margin for buttons.
button: Styled button with padding, gradient background, and hover effects.
.canvas-wrapper: Flexbox container for centering the canvas.
canvas: Styled canvas with border, background, margin, and hover effects.

3.script.js

This file contains the JavaScript code for the project.

# Key Functions:

Initialization: Sets up the canvas and context, initializes control points and dragging variables.
factorial(n): Calculates the factorial of a number.
drawBezierCurve(): Draws the Bezier curve based on control points.
getHodographPoints(): Calculates the hodograph points from control points.
drawHodograph(): Draws the hodograph based on hodograph points.
drawControlPoints(): Draws the control points and lines connecting them.
render(): Clears the canvas and redraws the control points, Bezier curve, and hodograph.
Event Listeners: Handles adding, removing, and dragging control points, and clearing the canvas.

# Usage

# Adding Points
Left Click: Adds a control point at the clicked position.
# Removing Points
Right Click: Removes the control point at the clicked position.
# Dragging Points
Mouse Down: Starts dragging a control point.
Mouse Move: Drags the control point.
Mouse Up: Stops dragging the control point.
# Clearing the Canvas
Clear Canvas Button: Clears all control points and redraws the canvas.

# Running the Project
Open index.html in a web browser.
Interact with the canvas to visualize the Bezier curve and hodograph.
# Conclusion
This project provides an interactive way to visualize Bezier curves and their hodographs, allowing users to dynamically add, remove, and drag control points on a canvas.
