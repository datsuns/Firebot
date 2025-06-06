"use strict";

(function() {

    angular
        .module("firebotApp")
        .component("setupsSettings", {
            template: `
                <div>

                    <firebot-setting
                        name="{{'SETTINGS.SETUPS.IMPORT_SETUP.NAME' | translate }}"
                        description="{{'SETTINGS.SETUPS.IMPORT_SETUP.DESCRIPTION' | translate }}"
                    >
                        <firebot-button
                            text="{{'SETTINGS.SETUPS.IMPORT_SETUP.BUTTON' | translate }}"
                            ng-click="showImportSetupModal()"
                        />
                    </firebot-setting>

                    <firebot-setting
                        name="{{'SETTINGS.SETUPS.CREATE_SETUP.NAME' | translate }}"
                        description="{{'SETTINGS.SETUPS.CREATE_SETUP.DESCRIPTION' | translate }}"
                    >
                        <firebot-button
                            text="{{'SETTINGS.SETUPS.CREATE_SETUP.BUTTON' | translate }}"
                            ng-click="showCreateSetupModal()"
                        />
                    </firebot-setting>

                    <firebot-setting
                        name="{{'SETTINGS.SETUPS.REMOVE_SETUP.NAME' | translate }}"
                        description="{{'SETTINGS.SETUPS.REMOVE_SETUP.DESCRIPTION' | translate }}"
                    >
                        <firebot-button
                            text="{{'SETTINGS.SETUPS.REMOVE_SETUP.BUTTON' | translate }}"
                            ng-click="showRemoveSetupModal()"
                        />
                    </firebot-setting>

                    
                </div>
          `,
            controller: function($scope, settingsService, utilityService) {
                $scope.settings = settingsService;

                $scope.showImportSetupModal = () => {
                    utilityService.showModal({
                        component: "importSetupModal",
                        backdrop: false
                    });
                };

                $scope.showCreateSetupModal = () => {
                    utilityService.showModal({
                        component: "createSetupModal"
                    });
                };

                $scope.showRemoveSetupModal = () => {
                    utilityService.showModal({
                        component: "removeSetupModal",
                        backdrop: true
                    });
                };

            }
        });
}());
