"use strict";
(function() {
    //This handles the Settings tab
    angular
        .module("firebotApp")
        .controller("settingsController", function($scope, settingsService) {
            $scope.settings = settingsService;

            $scope.categories = [
                {
                    name: "SETTINGS_PAGE.CATEGORIES.GENERAL.NAME",
                    description: "SETTINGS_PAGE.CATEGORIES.GENERAL.DESCRIPTION",
                    icon: "fa-sliders-v-square",
                    template: "<general-settings />"
                },
                {
                    name: "SETTINGS_PAGE.CATEGORIES.SETUPS.NAME",
                    description: "SETTINGS_PAGE.CATEGORIES.SETUPS.DESCRIPTION",
                    icon: "fa-box-full",
                    template: "<setups-settings />"
                },
                {
                    name: "SETTINGS_PAGE.CATEGORIES.TRIGGERS.NAME",
                    description: "SETTINGS_PAGE.CATEGORIES.TRIGGERS.DESCRIPTION",
                    icon: "fa-bolt",
                    template: "<trigger-settings />"
                },
                {
                    name: "SETTINGS_PAGE.CATEGORIES.EFFECTS.NAME",
                    description: "SETTINGS_PAGE.CATEGORIES.EFFECTS.DESCRIPTION",
                    icon: "fa-magic",
                    template: "<effect-settings />"
                },
                {
                    name: "SETTINGS_PAGE.CATEGORIES.DATABASE.NAME",
                    description: "SETTINGS_PAGE.CATEGORIES.DATABASE.DESCRIPTION",
                    icon: "fa-database",
                    template: "<database-settings />"
                },
                {
                    name: "SETTINGS_PAGE.CATEGORIES.OVERLAY.NAME",
                    description: "SETTINGS_PAGE.CATEGORIES.OVERLAY.DESCRIPTION",
                    icon: "fa-tv",
                    template: "<overlay-settings />"
                },
                {
                    name: "SETTINGS_PAGE.CATEGORIES.INTEGRATIONS.NAME",
                    description: "SETTINGS_PAGE.CATEGORIES.INTEGRATIONS.DESCRIPTION",
                    icon: "fa-globe",
                    template: "<integration-settings />"
                },
                {
                    name: "SETTINGS_PAGE.CATEGORIES.TTS.NAME",
                    description: "SETTINGS_PAGE.CATEGORIES.TTS.DESCRIPTION",
                    icon: "fa-volume",
                    template: "<tts-settings />"
                },
                {
                    name: "SETTINGS_PAGE.CATEGORIES.BACKUPS.NAME",
                    description: "SETTINGS_PAGE.CATEGORIES.BACKUPS.DESCRIPTION",
                    icon: "fa-file-archive",
                    template: "<backups-settings />"
                },
                {
                    name: "SETTINGS_PAGE.CATEGORIES.SCRIPTS.NAME",
                    description: "SETTINGS_PAGE.CATEGORIES.SCRIPTS.DESCRIPTION",
                    icon: "fa-code",
                    template: "<scripts-settings />"
                },
                {
                    name: "SETTINGS_PAGE.CATEGORIES.ADVANCED.NAME",
                    description: "SETTINGS_PAGE.CATEGORIES.ADVANCED.DESCRIPTION",
                    icon: "fa-tools",
                    template: "<advanced-settings />"
                }
            ];

            $scope.selectedCategory = $scope.categories[0];
            $scope.setSelectedCategory = (category) => {
                $scope.selectedCategory = category;
            };

            if (settingsService.getSetting("AutoUpdateLevel") > 3) {
                settingsService.saveSetting("AutoUpdateLevel", 3);
            }
        });
}());