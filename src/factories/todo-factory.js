import angular from 'angular';
import _ from 'lodash';

const todoFactory = angular.module("app.todoFactory",[]);

todoFactory.factory('todoFactory', ($http) => {
    function getTask($scope){
        $http.get('/todos').then( response => {
                $scope.todos = response.data.todos;
            }
        );
    }
    function createTask($scope, params){
        $http.post('/todos', {
            task: $scope.createNewTask,
            isCompleted: false,
            isEditing: false
        }).then(response => {
            if(response.data){
                //alert("Successfully created :"+response.data.task);
            }
            getTask($scope);
            //params.hasInput = false;
            $scope.createNewTask = '';
        });
        // params.hasInput = false;
        // $scope.createNewTask = '';
    }

    function updateTask($scope, todo){
        // todo.task = todo.updatedValue;
        // todo.isEditing = false;
        $http.put(`/todos/${todo._id}`,{ task : todo.updatedValue }).then(response => {
            if(response.data){
                alert("Successfully updaed :"+response.data.task);
            }
            getTask($scope);
            todo.isEditing = false;
        });
    }
    function deleteTask($scope, deletingTodo){
        $http.delete(`/todos/${deletingTodo._id}`).then(response => {
             if(response.data){
                getTask($scope);
             }
        });
        // _.remove($scope.todos, todo => todo.task === deletingTodo.task);
    }
    function watchCreateNewTask(params, $scope, val){
        if(!val && params.hasInput){
            $scope.todos.pop();
            params.hasInput = false;
        }else if(val && !params.hasInput){
            $scope.todos.push({ 
                task: val,
                isCompleted: false
            });
            params.hasInput = true;
        }else if (val && params.hasInput){
            $scope.todos[$scope.todos.length -1].task = val;
        }
    }
    return{
        getTask,
        createTask,
        updateTask,
        deleteTask,
        watchCreateNewTask
    }
});

export default todoFactory;