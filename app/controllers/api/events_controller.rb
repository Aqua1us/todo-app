class Api::EventsController < ApplicationController

  # GET /events
  def index
    @events = Task.all
  end

  private
    # Never trust parameters from the scary internet, only allow the white list through.
    def event_params
      params.fetch(:event, {}).permit(
        :name, :is_done, :deadline
      )
    end
end