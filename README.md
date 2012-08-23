jquery.maze
===============================

Perfect maze generator.

## Installation

Include script *after* the jQuery library (unless you are packaging scripts somehow else):

    <script src="/path/to/jquery.maze.js"></script>

## Demo page

[http://siciarek.linuxpl.info/jquery-maze/demo/index.html](http://siciarek.linuxpl.info/jquery-maze/demo/index.html)

## Usage

Constructor can be called with two optional parameters (rows, cols), which mean number of horizontal and
vertical corridors of created maze. Default values are: rows=25, cols=60.
The lowest valid value for rows and cols is 2. If rows or cols value is set to value less then 2 - 
Exception "The lowest valid value for rows and cols is 2" is thrown.

    var maze = $.Maze();

Method `get_board()` returns maze definition as a two dimensional array.

```js
    var maze = $.Maze(3, 3);
    var board = maze.get_board();
```

In the example above variable `board` can contain:

    [
        [1, 1, 1, 1, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 1],
        [1, 0, 1, 0, 1, 1, 1],
        [1, 0, 1, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 1]
    ]



## Development

- Source hosted at [GitHub](https://github.com/siciarek/jquery-maze)
- Report issues, questions, feature requests on [GitHub Issues](https://github.com/siciarek/jquery-maze/issues)

## Authors

[Jacek Siciarek](https://github.com/siciarek)
