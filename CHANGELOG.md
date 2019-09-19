## 0.7.2
* `gauge-chart@0.5.3` should not case `ng build --prod` compilation error.

## 0.7.0
* Requires Angular 8 as peer dependency.

## 0.6.0
* Requires Angular 7 as peer dependency.

## 0.5.3
* Fixed `angular ng build --prod` failure described in [#16](https://github.com/recogizer/angular-gauge-chart/issues/16) thanks to [@shashi97](https://github.com/shashi97).
* Fixed a bug described in [#13](https://github.com/recogizer/angular-gauge-chart/issues/13) and [#14](https://github.com/recogizer/angular-gauge-chart/issues/17).
* Updated README.

## 0.5.2
* Updated to Angular 7.
* Fixed a bug described in [#14](https://github.com/recogizer/angular-gauge-chart/issues/14) thanks to [@csprea](https://github.com/csprea).

## 0.5.1
* Fixed vulnerability bug.

## 0.5.0
**Breaking Changes**:
* The component was renamed: `<gauge-chart/>` -> `<rg-gauge-chart>`.
* The NPM name was changed: `@recogizer/angular-gauge-chart` -> `angular-gauge-chart`.

**Other Changes**:

* Fixed the bug described in [#1](https://github.com/recogizer/angular-gauge-chart/issues/1).
* Now requires `Angular 6`.
* Now using `ng g lib` from Angular CLI 6.

## 0.4.3
* Fixed bug with gauge-chart importing by deleting outdated code and updated the build.

## 0.4.2
* Fixed vulnerability bug and docs generated.

## 0.4.1
* Updated gauge-chart import, examples, README.

## 0.3.4 
* Fixed building process. Now bundle doesn't include tslib (requires it as peer dependency).
