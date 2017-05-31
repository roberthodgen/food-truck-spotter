# food-truck-spotter

> An Ionic PWA for food truck spotting

This is a simple Ionic PWA and Cordova app for spotting a food truck.
Hits an API to get a list of a food truck's upcoming _events_.
_Events_ contain information about the date/time and location of a food truck.
With pre-programmed menu this offers quick and real-time food truck spotting!


## Goals

### Home

- Contains a list of upcoming _events_ pulled from a JSON API
- Highlight next _event_
- Link to the menu


### Menu

- Card-style food items, static


### Event details

- Detail view of a single _event_
- Map preview (online-only)
- Full description


## Event data structure

```json
[{
  "id": "6fc9a8c4f9a27948",
  "name": "Food Truck Friday's",
  "description": "Come see us this Friday for local Food Truck Friday's at Lorem Ipsum!",
  "start": "2017-06-02-31T20:00:00.000Z",
  "end": "2017-06-03T01:00:00.000Z",
  "created": "2017-05-31T01:13:42.810Z",
  "updated": "2017-05-31T01:13:42.810Z",
  "location": {
    "name": "Lorem Ipsum",
    "street": "400 S Monroe St",
    "city": "Tallahassee"
  }
}]
```
