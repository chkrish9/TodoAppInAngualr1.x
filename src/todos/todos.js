import _ from 'lodash';

export default function($scope, todoFactory){
    let params = {
        hasInput: false
    };
    console.log(todoFactory.createTask);
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
    $scope.onEditClick = todo => {
        todo.isEditing = true;
        todo.updatedValue = todo.task;
    };
    $scope.onCancelClick = todo => {
        todo.isEditing = false;
    };
    // $scope.onDeleteClick = deletingTodo => {
    //     _.remove($scope.todos, todo => todo.task === deletingTodo.task);
    // };
    $scope.onDeleteClick = _.partial(todoFactory.deleteTask, $scope);
    // $scope.createTask = () => {
    //     params.hasInput = false;
    //     $scope.createNewTask = '';
    // };
    //$scope.createTask = todoFactory.createTask.bind(this,$scope,params);
    $scope.createTask = _.partial(todoFactory.createTask, $scope, params);
    // $scope.updateTask = todo => {
    //     todo.task = todo.updatedValue;
    //     todo.isEditing = false;
    // };
    $scope.updateTask = _.partial(todoFactory.updateTask);

    // $scope.$watch('createNewTask', val => {
    //     if(!val && params.hasInput){
    //         $scope.todos.pop();
    //         params.hasInput = false;
    //     }else if(val && !params.hasInput){
    //         $scope.todos.push({ 
    //             task: val,
    //             isCompleted: false
    //         });
    //         params.hasInput = true;
    //     }else if (val && params.hasInput){
    //         $scope.todos[$scope.todos.length -1].task = val;
    //     }
    // });
    $scope.$watch('createNewTask', _.partial(todoFactory.watchCreateNewTask, params, $scope));
}