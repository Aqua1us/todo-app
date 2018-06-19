json.set! :events do
  json.array! @events do |event|
    json.set! :title, event.name
    json.set! :start, event.deadline
    json.set! :end, event.deadline
    json.set! :allDay, true
  end
end