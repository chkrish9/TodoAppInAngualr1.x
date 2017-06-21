import _ from 'lodash';

export default function($scope){
    let params = {
        hasInput: false
    }
    $scope.todos = [
        {
            task: 'Wash dishes',
            isCompleted: false,
            isEditing: false            
        },
        {
            task: 'Take dog to walk',
            isCompleted: true,
            isEditing: false
        },
        {
            task: 'Clean the room',
            isCompleted: false,
            isEditing: false
        }
    ];

    $scope.onCompletedTask = todo => {
        todo.isCompleted = ! todo.isCompleted;
    };
    $scope.createTask = () => {
        params.hasInput = false;
        $scope.createNewTask = '';
    };
    $scope.onEditClick = todo => {
        todo.isEditing = true;
        todo.updatedValue = todo.task;
    };
    $scope.onCancelClick = todo => {
        todo.isEditing = false;
    };
    $scope.onDeleteClick = deletingTodo => {
        _.remove($scope.todos, todo => todo.task === deletingTodo.task);
    };
    $scope.updateTask = todo => {
        todo.task = todo.updatedValue;
        todo.isEditing = false;
    };

    $scope.$watch('createNewTask', val => {
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
    })
}