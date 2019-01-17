# brite-core-table

## Approach and deployment method
For this test i deployed using heroku as it is the fastest method and it allows to connect with github, my approach to solve this was try to create a table component that could be used everywhere so i handle all data interactions on the parent component, for the tests they are not completed not even well written as i have not much experience with them and also didn't want to take more time than what i already did.

## Time spent
I spent arround 8 to 10 hrs to complete this test to it current status, if i could take more time i would enhance the visuals and user experience, also do extra research to do proper unit testing.

## Component adaptability
Right now i think the component is very usable for many scenarios, i would like to include support for scoped template, and extra options like fixed headers and fixed columns.

## Favorite css
My both favorite css properties are `flex` and `grid`, `flex` because it gives lots of flexibility when creating a layout the downside is the rigidity of the template, and that is where `grid` comes to play it give extra flexibility which helps to reshape the layout of a page based on screen resolutions or other params, without extra js.

## Favorite modern js feature
Arrow functions, and new array prototype functions, Arrow functions allow for cleaner code and easier to understand, and for the new array prototype functions, they are a good way to reduce the need for some algorithms that might get too complex to read and or reuse.

## Favorite third party vue library
vue-multiselect as it brings a powerful select component that has lots of options and extra features.

## DataTable instructions
For the data table to work you must pass a `headers` and a `data` props, these props should be structured on the next way:

```
headers: [
  {
    text: String,
    key: String (Should be the key of the data related to it),
    sortable: Boolean,
    width: String (Width of the column),
    styles: Object (Styles for the column)
  },
  {
    text: 'Name',
    key: 'name',
    sortable: true,
    width: '200px',
    styles: {
      background: red,
      border: 1px solid blue,
      ...
    }
  }
  ...
]
```

```
data: [
  {
    "id": "3471DA17-401F-9633-BF81-4CADA6FD5C79",
    "name": "Kyra Lester",
    "description": "Curabitur dictum. Phasellus in",
    "date": "2017-07-23T04:24:49-07:00",
    "amount": "345.54"
  },
  {
    "id": "9F5C9912-936A-FB85-1EDB-9DA87BE7FF1E",
    "name": "Buckminster Alvarado",
    "description": "dui, in sodales elit erat vitae risus. Duis a mi",
    "date": "2018-11-08T05:44:15-08:00",
    "amount": "677.08"
  },
  ...
]
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Run your unit tests
```
npm run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
