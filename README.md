This is a browser calculator and my first full-fledged React App!

I am not breaking any new ground here, but the practical application of the things I have been learning is important.

Things next:
- Make up and down arrows functional
- - Make equals sign turn into a copy button
- - Allow for moving the cursor, but not adding anything
- - - Do not allow this for error lines
- - Edge case where having one line, pressing equals, and navigating upward causes a glitch
- Make results that have e# fully be on the screen
- - Note that #.#e# can go up to 22 characters (17 numbers, 1 decimal point, 1 e, 3 digits after e)
- - Can convert to normal number using Number(4.3e7).toPrecision(), but this only works up to a point
- - Can fix digits after decimal with Number(4.3e7).fixed(7)

Things on the list:
- Make math lines functional
- - Make it add * between parentheses in math lines before it evaluates
- Make keyboard buttons