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