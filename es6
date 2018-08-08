class Circle {
    constructor(radius){
        this.radius = radius; //own instance
        this.move = function(){}
    }
    draw(){} //prototype instance
}
typeof Circle //function

Hoisting

sayHello(); //it will work as function declaration gets hoisted go on the top of the scope
sayGoodbye(); //Uncaught ReferenceError: sayGoodbye is not defined
console.log(number);  //Uncaught ReferenceError: number is not defined

//Function Declaration
function sayHello(){}

//Function Expression
const sayGoodbye = function(){};
const number = 1;

//; is required at the end of expression not required for function declaration

const c = new Circle(); //Uncaught ReferenceError: Circle is not defined
const c = new Square(); //Uncaught ReferenceError: Square is not defined

//Class Declaration
class Circle{}

//Class Expression
const Square = class {}

both the cases hoisting is not allowed, it will throw the above error

Static Methods //accessible through class only not associated with object, it is not object instance not visible in prototypical hierarchy

class Circle{
    constructor(radius){
        this.radius = radius;
    }
    //Instance Method
    draw(){}

    //Static Method
    static parse(str){
        const radius = JSON.parse(str).radius;
        return new Circle(radius);
    }
} 
const circle = Circle.parse('{"radius": 1}');

This
const Circle = function(){
    this.draw = function(){}
}
const c = new Circle();
//Method Call
c.draw(); //'this' will point to the object

//const draw = c.draw;
//Function Call
draw(); //'this' is not associated with any object it's associated with standalone function whic is pointed to global object i.e., window

'use strict'; //draw() //undefined //it will restrict 'this' to point to global object, restrict from altering the global namespace
JS engine runs class body in 'strict' mode by default, no need to add 'use strict' explicitly

this._radius //_ is a convention to describe private variable

const _radius = Symbol(); //create new identifier everytime, 
const _draw = Symbol();
class Circle{
    constructor(radius){
        this.radius = radius;
        this['radius'] = radius;
        this[_radius] = radius;
    }
    [_draw](){} //[] //ES6 computed property name, expression inside [] will be executed and then the value will be returned
}

Symbol() === Symbol() //false

const c = new Circle(1);
console.log(c);
Circle{
    Symbol(): 1
}
console.log(Object.getOwnPropertyNames(c)); //[]
const key = Object.getOwnPropertySymbols(c)[0];
console.log(c[key]); //1

Weakmaps

const _radius = new WeakMap();
const _move = new WeakMap();

const privateProps = new WeakMap();

//unable to see the methods in the Circle object in console

class Circle{
    constructor(radius){
        _radius.set(this, radius); //key/value pair, first parameter key should be object
        _move.set(this, function(){ // ()=>{ //this -> Circle{}
            console.log('move', this); //this -> undefined
        })

        privateProps.set(this, {
            radius: radius,
            move: ()=>{}
        })
    }
    draw(){
        console.log(_radius.get(this));
    }
    draw(){
        _move.get(this)();
    }
    privateProps.get(this).radius;
}


Getters & Setters
get radius(){
    return _radius.get(this);
}
//c.radius
set radius(value){
    if(value <= 0) throw new Error('invalid radius');
    _radius.set(this, value);
}
//c.radius = 10

Inheritance

class Shape{
    constructor(color){}
    move(){}
}

class Circle extends Shape{
    constructor(color, radius){
        super(color);
        this.radius = radius;
    }
    move(){
        super.move(); //reuse the parent method
    } //Method overridding
    draw(){}
}
const c = new Circle('blue', 1);
