import angular from 'angular';
import _ from 'lodash';

const todoFactory = angular.module("app.todoFactory",[]);

todoFactory.factory('todoFactory', () => {
    function createTask($scope, params){
        params.hasInput = false;
        $scope.createNewTask = '';
    }

    function updateTask(todo){
        todo.task = todo.updatedValue;
        todo.isEditing = false;
    }
    function deleteTask($scope, deletingTodo){
         _.remove($scope.todos, todo => todo.task === deletingTodo.task);
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
        createTask,
        updateTask,
        deleteTask,
        watchCreateNewTask
    }
});

export default todoFactory;