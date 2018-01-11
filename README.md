Agricola_react
--------------------
This is a port of https://github.com/JerBushau/agricola_Piecekeeper built with React.

An application created to speed up gameplay of the Agricola board game. It tracks the accumulation spaces so that you or your group doesn't have to spend time putting out pieces each harvest. It also helps ensure there are enough peices for everyone when playing with a full group. It was built to be cast onto a large display so although it is responsive in design and looks nice on mobile, the non-basic commands are not _yet_ supported on mobile devices.

## To Run the App:
+ `clone repo`
+ run `npm install`
+ run `npm start`
+ app should be up and running on `localhost:3000`

## How it works:
#### Basic commands
+ Accumulate all spaces:
  + Simply click or touch the accumulate button.
+ Gather the resources:
  + Simply click or touch the space you wish to gather.
+ Add additional spaces to the board (sheep, boar, stone etc.):
  + Simply click the 'add space' button and choose the space you wish to add from the menu.

#### Other commands (not _yet_ supported on mobile)
+ Roll back to the previous round:
  + Shift+click the accumulation button.
+ Increment an individual space by it's default amount:
  + Shift+click the space you wish to increment.
+ To toggle a display with the value of each space before the most recent accumulation:
  + Crtl+click any space
