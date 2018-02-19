# Angular Gauge Chart

This is an angular wrap-over for the library [gauge-chart](https://www.npmjs.com/package/gauge-chart)

[![npm version](https://badge.fury.io/js/)](https://www.npmjs.com/package/angular-gauge-chart)

**A library for creating nice and flexible gauge charts.**

You can [catch us on twitter](https://twitter.com/recogizer): [@recogizer](https://twitter.com/recogizer) or head over to [our company's website](http://www.recogizer.com/).

## [Demo]() | [Documentation]()

## Installation

In order to work with `angular-gauge-chart`, you have to install `gauge-chart` libarary first:

```
  npm install gauge-chart
  npm install angular-gauge-chart 
```

## Usage

Create an element for positioning gauge in your html file:

```html
<gauge-chart
    [canvasWidth]="canvasWidth"
    [needleValue]="needleValue"
    [centralLabel]="centralLabel"
    [options]="options"></gauge-chart>
```

Now you're ready to draw your own gauge.

Just copy to your ts file the following code:

```typescript
public canvasWidth = 300
public needleValue = 0
public centralLabel = ''
public options = {
    hasNeedle: true,
    needleColor: 'gray',
    needleUpdateSpeed: 1000,
    arcColors: ['rgb(44, 151, 222)', 'lightgray'],
    arcDelimiters: [30],
    rangeLabel: ['0', '100'],
    needleStartValue: 50,
}
```


#### Result:

![Gauge Example](/examples/img/gauge1.png "Gauge Example")

By default, the needle is pointing to 0, thus in order to move it you have to use `.updateNeedle(val)`, where `val` denotes the value on the chart.

Feel free to change or delete any of the gaugeOptions properties as long as their values are in permitted ranges.

## Options

canvasWidth: number

needleValue: number

centralLabel: string

options: { ... }

| Name | Values Ranges | Description |
| ---- | ------------- | ----------- |
| hasNeedle | true / false | determines whether to show the needle or not |
| needleColor | [value supported by CSS](https://www.w3schools.com/colors/default.asp) | colorizes needle with specified colors |
| needleUpdateSpeed | number larger than 0 | determines the speed of needle update animation |
| arcColors | [array of values supported by CSS](https://www.w3schools.com/colors/default.asp) | colorizes gauge with specified color |
| arcDelimiters | array of numbers from 0 to 100 | specifies delimiters of the gauge in ascending order |
| rangeLabel | array of two strings | depicts gauge ranges on both sides of the chart |
| centralLabel | string | depicts gauge inner label |

name?: string (will be shown above the gauge)

nameFont?: number () (font size of the name)

bottomLabel?: string (will be shown bellow the gauge)

bottomLabelFont?: number (font size of the bottom label)

## Examples

Some examples of what you can get out of the library using different properties:

![Gauge Examples](/examples/img/gauge2.png "Gauge Examples")

## Contributing
Build the library with `npm run build`. This will fetch all dependencies and then compile the `dist` files. To see the examples locally you can start a web server with `npm start` and go to `localhost:3000`.

## License
MIT License. Copyright (c) 2017-2018 RECOGIZER GROUP GmbH.

## Authors
Alexey Karpov, Maxim Maltsev.
