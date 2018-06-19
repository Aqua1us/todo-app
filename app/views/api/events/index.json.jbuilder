json.set! :events do
  json.array! @events do |event|
    json.set! :id, event.id
    json.set! :title, event.name
    json.set! :start, event.startdate
    json.set! :end, event.enddate
    json.set! :allDay, false
  end
end