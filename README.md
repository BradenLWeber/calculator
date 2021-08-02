This is a browser calculator and my first full-fledged React App!

I am not breaking any new ground here, but the practical application of the things I have been learning is important.

Things next:
- Make results that have e# fully be on the screen
- - Note that #.#e# can go up to 22 characters (17 numbers, 1 decimal point, 1 e, 3 digits after e)
- - Can convert to normal number using Number(4.3e7).toPrecision(), but this only works up to a point
- - Can fix digits after decimal with Number(4.3e7).fixed(7)
- Deleting ln puts the cursor at the wrong spot
- Deleting parentheses attached to special operation should delete operation too
- Left side arrows need to match lines when up/down arrows are used

Things on the list:
- Make math lines functional
- - Make it add * between parentheses in math lines before it evaluates
- Make keyboard buttons