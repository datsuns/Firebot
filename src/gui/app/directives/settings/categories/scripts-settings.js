"use strict";

(function() {

    angular
        .module("firebotApp")
        .component("scriptsSettings", {
            template: `
                <div>

                    <firebot-setting
                        name="{{'SETTINGS.SCRIPTS.CUSTOM_SCRIPTS.NAME' | translate }}"
                        description="{{'SETTINGS.SCRIPTS.CUSTOM_SCRIPTS.DESCRIPTION' | translate }}"
                    >
                        <setting-description-addon>
                            <div style="margin-top: 10px;">Want to write your own scripts? Learn how <a
                                class="clickable"
                                ng-click="openLink('https://github.com/crowbartools/Firebot/wiki/Writing-Custom-Scripts')"
                            >here</a
                            >.</div>
                        </setting-description-addon>
                        <firebot-select
                            options="{ true: 'Enabled', false: 'Disabled' }"
                            ng-init="customScriptsEnabled = settings.getSetting('RunCustomScripts')"
                            selected="customScriptsEnabled"
                            on-update="settings.saveSetting('RunCustomScripts', option === 'true')"
                            right-justify="true"
                            aria-label="Enable or disable custom scripts"
                        />
                    </firebot-setting>

                    <firebot-setting
                        name="{{'SETTINGS.SCRIPTS.STARTUP_SCRIPTS.NAME' | translate }}"
                        description="{{'SETTINGS.SCRIPTS.STARTUP_SCRIPTS.DESCRIPTION' | translate }}"
                    >
                        <firebot-button
                            text="Manage Startup Scripts"
                            disabled="!settings.getSetting('RunCustomScripts')"
                            ng-click="openStartupScriptsModal()"
                        />
                    </firebot-setting>

                    <firebot-setting
                        name="{{'SETTINGS.SCRIPTS.CLEAR_CUSTOM_SCRIPT_CACHE.NAME' | translate }}"
                        description="{{'SETTINGS.SCRIPTS.CLEAR_CUSTOM_SCRIPT_CACHE.DESCRIPTION' | translate }}"
                    >
                        <firebot-select
                            options="{ true: 'On', false: 'Off' }"
                            ng-init="clearCache = settings.getSetting('ClearCustomScriptCache')"
                            is-disabled="!settings.getSetting('RunCustomScripts')"
                            selected="clearCache"
                            on-update="settings.saveSetting('ClearCustomScriptCache', option === 'true')"
                            right-justify="true"
                            aria-label="Enable or disable the Clearing of Custom Script Cache"
                        />
                    </firebot-setting>


                </div>
          `,
            controller: function($rootScope, $scope, settingsService, utilityService) {
                $scope.openLink = $rootScope.openLinkExternally;
                $scope.settings = settingsService;

                $scope.openStartupScriptsModal = function() {
                    utilityService.showModal({
                        component: "startupScriptsListModal",
                        size: "sm",
                        backdrop: true,
                        keyboard: true
                    });
                };

            }
        });
}());
