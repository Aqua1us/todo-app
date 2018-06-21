class Api::TasksController < ApplicationController

  # GET /tasks
  def index
    @tasks = Task.order('is_done', 'startdate ASC')
  end

  # POST /tasks
  def create
    @task = Task.new(task_params)

    if @task.save
      render :show, status: :created
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /tasks/1
  def update
    @task = Task.find(params[:id])
    if @task.update(task_params)
      render :show, status: :ok
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  # PATCH/DELETE /tasks/1
  def destroy
    @task = Task.find(params[:id])
    if @task.destroy
      render :show, status: :ok
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  private
    # Never trust parameters from the scary internet, only allow the white list through.
    def task_params
      params.fetch(:task, {}).permit(
        :name, :is_done, :startdate, :enddate
      )
    end
end