# VICE Front-end Coding Exercise

Can be downloaded from here or viewed at https://flyingace.github.io/vice_challenge

## Notes
The open-endedness of this exercise required that I make a number of decisions about how the project was to be designed and constructed which may benefit from some explanation.

1. I chose to use 'vanilla' JavaScript for the project because due to its scope, using a framework like React seemed as though it would be overkill. There were times though when I found that something like React would have been useful but mostly as a way of breaking apart the js a bit.
2. The specs call for a mobile-first approach, but there are no concrete layout specs. The comps are loose wireframes. While this is fine for an exercise such as this, it pushed me in a direction that I might not have taken if I had specs that included information about target dimensions and positioning. Ultimately the css that was written for this project doesn't make use of breakpoints, but rather relies on percentage values and the like to adjust the layout as it scales. The application works and looks fine at the specified breakpoints, but in retrospect I feel as though that the appearance might have benefitted from my making decisions about and adding target dimensions and positioning to the wireframes at the outset.
3. Semantic html has been applied as best I could suss out, though I don't know, for example, whether the display of the show's main image, its title and episode count would really count as an "article."
4. I had initially included right and left arrows for navigation on the desktop versions but I didn't get around to adding their functionality. Currently they are set to `display: none` but I may return shortly to add that functionality to the project (this would most likely require that I finally add a single media query to the scss/css!)
