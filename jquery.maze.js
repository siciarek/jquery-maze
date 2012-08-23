/**
 * jQuery Maze generator v1.1b
 * https://github.com/siciarek/jquery-maze
 *
 * Copyright 2012, Jacek Siciarek
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/GPL-2.0
 */
(function ($) {

    function rand(min, max) {
        var base = max - min + 1;

        var temp = Math.floor(Math.random() * 1000000) % base;

        return temp + min;
    }

    $.Stack = function () {

        var instance = {
            container: [],

            empty: function () {
                return this.container.length == 0;
            },

            top: function () {
                return this.container[this.container.length - 1];
            },

            pop: function () {
                return this.container.pop();
            },

            push: function (value) {
                this.container.push(value);
            }
        };

        return $.extend({}, instance);
    };

    $.Abilities = function (r, c) {

        var instance = {
            r: r,
            c: c
        };

        return $.extend({}, instance);
    };

    $.Maze = function (rows, cols) {

        rows = rows || 25;
        cols = cols || 60;

        if(!(rows >= 2 && cols >= 2))
        {
            throw 'The lowest valid value for rows and cols is 2';
        }

        var instance = {
            /**
             * Wall and path values:
             */
            WALL: 1,
            PATH: 0,

            /**
             * Directions
             */
            NONE: 0,
            SOUTH: 1,
            EAST: 2,
            NORTH: 4,
            WEST: 8,

            rows: 0,
            cols: 0,
            _rows: 0,
            _cols: 0,

            enter: [],
            exit: [],

            abilities_stack: $.Stack(),
            maze_board: [],

            new: function (rows, cols) {

                this.rows = rows * 2 + 1;
                this.cols = cols * 2 + 1;

                this._rows = this.rows - 2;
                this._cols = this.cols - 2;

                for (var r = 0; r < this.rows; r++) {
                    this.maze_board[r] = [];

                    for (c = 0; c < this.cols; c++) {
                        this.maze_board[r][c] = this.WALL;
                    }
                }

                this.abilities_stack = $.Stack();
                this.abilities_stack.push($.Abilities(1, 1));

            },

            make_move: function (direction) {

                var r = this.abilities_stack.top().r;
                var c = this.abilities_stack.top().c;

                switch (direction) {

                    case this.NONE:
                        break;

                    case this.NORTH:
                        this.maze_board[r][c] = this.PATH;
                        this.maze_board[r - 1][c] = this.PATH;
                        this.maze_board[r - 2][c] = this.PATH;
                        r -= 2;
                        break;

                    case this.EAST:
                        this.maze_board[r][c] = this.PATH;
                        this.maze_board[r][c + 1] = this.PATH;
                        this.maze_board[r][c + 2] = this.PATH;
                        c += 2;
                        break;

                    case this.SOUTH:
                        this.maze_board[r][c] = this.PATH;
                        this.maze_board[r + 1][c] = this.PATH;
                        this.maze_board[r + 2][c] = this.PATH;
                        r += 2;
                        break;

                    case this.WEST:
                        this.maze_board[r][c] = this.PATH;
                        this.maze_board[r][c - 1] = this.PATH;
                        this.maze_board[r][c - 2] = this.PATH;
                        c -= 2;
                        break;
                }

                this.abilities_stack.push($.Abilities(r, c));
            },

            check_ability: function (direction) {

                var r = this.abilities_stack.top().r;
                var c = this.abilities_stack.top().c;

                switch (direction) {

                    case this.NONE:
                        break;

                    case this.NORTH:
                        if (r > 1 && this.maze_board[r - 1][c] == this.WALL && this.maze_board[r - 2][c] == this.WALL)
                            return true;
                        break;

                    case this.EAST:
                        if (c < this._cols - 1 && this.maze_board[r][c + 1] == this.WALL && this.maze_board[r][c + 2] == this.WALL)
                            return true;
                        break;

                    case this.SOUTH:
                        if (r < this._rows - 1 && this.maze_board[r + 1][c] == this.WALL && this.maze_board[r + 2][c] == this.WALL)
                            return true;
                        break;

                    case this.WEST:
                        if (c > 1 && this.maze_board[r][c - 1] == this.WALL && this.maze_board[r][c - 2] == this.WALL)
                            return true;
                        break;
                }

                return false;
            },

            get_board: function () {

                var door;

                while (!this.abilities_stack.empty()) {
                    if (this.check_ability(this.NORTH) || this.check_ability(this.EAST)
                        || this.check_ability(this.WEST) || this.check_ability(this.SOUTH)) {
                        // LOSOWANIE KIERUNKU:
                        do {
                            r = Math.pow(2, rand(0, 3));
                        } while (!this.check_ability(r));

                        this.make_move(r);
                    } else {
                        this.abilities_stack.pop();
                    }
                }

                // CREATE door:

                do {
                    door = rand(0, this._cols);
                } while ((door % 2 == 0) || this.maze_board[1][door] == this.WALL);

                this.maze_board[0][door] = this.PATH;
                this.enter = { r: 0, c: door };

                // CREATE EXIT:

                do {
                    door = rand(0, this._cols);
                } while ((door % 2 == 0) || this.maze_board[this._rows][door] == this.WALL);

                this.maze_board[this._rows + 1][door] = this.PATH;
                this.exit = { r: this._rows + 1, c: door };

                return this.maze_board;
            },

            _: 0
        };

        instance.new(rows, cols);

        return $.extend({}, instance);
    };

})(jQuery, document);
