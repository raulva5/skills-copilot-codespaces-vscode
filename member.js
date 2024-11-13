function skillsMember() {
    return {
        restrict: 'E',
        templateUrl: 'modules/skills/views/member.html',
        controller: 'SkillsMembersController',
        controllerAs: 'vm',
        bindToController: true,
        scope: {
            member: '='
        }
    }
}