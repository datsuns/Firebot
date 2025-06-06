"use strict";

(function() {

    angular
        .module("firebotApp")
        .component("databaseSettings", {
            template: `
                <div>

                    <firebot-setting
                        name="{{'SETTINGS.DATABASE.VIEWER_DATABASE.NAME' | translate }}"
                        description="{{'SETTINGS.DATABASE.VIEWER_DATABASE.DESCRIPTION' | translate }}"
                    >
                        <firebot-select
                            options="{ true: 'On', false: 'Off' }"
                            ng-init="viewerDb = settings.getSetting('ViewerDB')"
                            selected="viewerDb"
                            on-update="settings.saveSetting('ViewerDB', option === 'true')"
                            right-justify="true"
                            aria-label="enable or disable Viewer Database"
                        />
                    </firebot-setting>

                    <firebot-setting
                        name="{{'SETTINGS.DATABASE.AUTO_FLAG_BOTS.NAME' | translate }}"
                        description="{{'SETTINGS.DATABASE.AUTO_FLAG_BOTS.DESCRIPTION' | translate }}"
                    >
                        <firebot-select
                            options="{ true: 'On', false: 'Off' }"
                            ng-init="autoFlagBots = settings.getSetting('AutoFlagBots')"
                            selected="autoFlagBots"
                            on-update="settings.saveSetting('AutoFlagBots', option === 'true')"
                            right-justify="true"
                            aria-label="enable or disable Auto Flag Bots"
                        />
                    </firebot-setting>

                    <firebot-setting
                        name="{{'SETTINGS.DATABASE.VIEWERS_TABLE_PAGE_SIZE.NAME' | translate }}"
                        description="{{'SETTINGS.DATABASE.VIEWERS_TABLE_PAGE_SIZE.DESCRIPTION' | translate }}"
                    >
                        <firebot-select
                            options="[5,10,15,20,25,30,35,40,45,50,55,60]"
                            ng-init="viewerListPageSize = settings.getSetting('ViewerListPageSize')"
                            selected="viewerListPageSize"
                            on-update="settings.saveSetting('ViewerListPageSize', option)"
                            right-justify="true"
                            aria-label="enable or disable Viewers Table Page Size"
                        />
                    </firebot-setting>

                    <firebot-setting
                        name="{{'SETTINGS.DATABASE.PURGE_VIEWER_DATA.NAME' | translate }}"
                        description="{{'SETTINGS.DATABASE.PURGE_VIEWER_DATA.DESCRIPTION' | translate }}"
                    >
                        <firebot-button
                            text="View Purge Options"
                            ng-click="showPurgeViewersModal()"
                        />
                    </firebot-setting>

                </div>
          `,
            controller: function($scope, settingsService, utilityService) {
                $scope.settings = settingsService;

                $scope.showPurgeViewersModal = () => {
                    utilityService.showModal({
                        component: "purgeViewersModal",
                        size: 'sm',
                        backdrop: false,
                        keyboard: true
                    });
                };
            }
        });
}());
