"use strict";

(function() {

    angular
        .module("firebotApp")
        .component("advancedSettings", {
            template: `
                <div>

                    <firebot-setting
                        name="{{'SETTINGS.ADVANCED.DEBUG_MODE.NAME' | translate }}"
                        description="{{'SETTINGS.ADVANCED.DEBUG_MODE.DESCRIPTION' | translate }}"
                    >
                        <setting-description-addon>
                            <b>Firebot must be restarted for changes to this setting to take effect.</b>
                        </setting-description-addon>
                        <firebot-button
                            text="{{settings.getSetting('DebugMode') ? 'Disable Debug Mode' : 'Enable Debug Mode' }}"
                            ng-click="settings.saveSetting('DebugMode', !settings.getSetting('DebugMode'))"
                        />
                    </firebot-setting>

                    <firebot-setting
                        name="{{'SETTINGS.ADVANCED.WHILE_LOOP.NAME' | translate }}"
                        description="{{'SETTINGS.ADVANCED.WHILE_LOOP.DESCRIPTION' | translate }}"
                    >
                        <setting-description-addon>
                            <b>If you aren't careful, you can cause an infinite loop and freeze Firebot.</b>
                        </setting-description-addon>
                        <firebot-button
                            text="{{settings.getSetting('WhileLoopEnabled') ? 'Disable While Loops' : 'Enable While Loops' }}"
                            ng-click="toggleWhileLoops()"
                        />
                    </firebot-setting>

                    <firebot-setting
                        name="{{'SETTINGS.ADVANCED.QUOTE_ID_RECALCULATION.NAME' | translate }}"
                        description="{{'SETTINGS.ADVANCED.QUOTE_ID_RECALCULATION.DESCRIPTION' | translate }}"
                    >
                        <setting-description-addon>
                            <b>We recommend that you make a backup first, just in case.</b>
                        </setting-description-addon>
                        <firebot-button
                            text="Recalculate Quote IDs"
                            ng-click="recalculateQuoteIds()"
                        />
                    </firebot-setting>

                    <firebot-setting
                        name="{{'SETTINGS.ADVANCED.ALLOW_QUOTE_CSV_EXPORT.NAME' | translate }}"
                        description="{{'SETTINGS.ADVANCED.ALLOW_QUOTE_CSV_EXPORT.DESCRIPTION' | translate }}"
                    >
                        <firebot-select
                            options="{ true: 'On', false: 'Off' }"
                            ng-init="allowQuoteCsv = settings.getSetting('AllowQuoteCSVDownloads')"
                            selected="allowQuoteCsv"
                            on-update="settings.saveSetting('AllowQuoteCSVDownloads', option === 'true')"
                            right-justify="true"
                            aria-label="Choose Whether or not you want the 'Export as .CSV' button available for quotes on the profile page."

                        />
                    </firebot-setting>

                    <firebot-setting
                        name="{{'SETTINGS.ADVANCED.PERSIST_CUSTOM_VARIABLES.NAME' | translate }}"
                        description="{{'SETTINGS.ADVANCED.PERSIST_CUSTOM_VARIABLES.DESCRIPTION' | translate }}"
                    >
                        <firebot-select
                            options="{ true: 'On', false: 'Off' }"
                            ng-init="persistVariables = settings.getSetting('PersistCustomVariables')"
                            selected="persistVariables"
                            on-update="settings.saveSetting('PersistCustomVariables', option === 'true')"
                            right-justify="true"
                            aria-label="enable or disable persistent Custom Variables"
                        />
                    </firebot-setting>

                    <firebot-setting
                        name="{{'SETTINGS.ADVANCED.EXPERIMENTAL_CLIP_PLAYER.NAME' | translate }}"
                        description="{{'SETTINGS.ADVANCED.EXPERIMENTAL_CLIP_PLAYER.DESCRIPTION' | translate }}"
                    >
                        <toggle-button
                            toggle-model="settings.getSetting('UseExperimentalTwitchClipUrlResolver')"
                            on-toggle="settings.saveSetting('UseExperimentalTwitchClipUrlResolver', !settings.getSetting('UseExperimentalTwitchClipUrlResolver'))"
                            font-size="40"
                        />
                    </firebot-setting>

                    <div style="margin-top: 20px">
                        <p class="muted">Looking for a setting that used to be located here? Try checking in the Tools app menu!</p>
                    </div>

                </div>
          `,
            controller: function($scope, settingsService, utilityService, backendCommunicator) {
                $scope.settings = settingsService;

                $scope.toggleWhileLoops = () => {
                    const whileLoopsEnabled = settingsService.getSetting("WhileLoopEnabled");

                    if (whileLoopsEnabled) {
                        settingsService.saveSetting("WhileLoopEnabled", false);
                    } else {
                        utilityService
                            .showConfirmationModal({
                                title: "Enable While Loops",
                                question: "By enabling this feature, you understand that using While Loops incorrectly can potentially cause performance issues or even freeze Firebot.",
                                confirmLabel: "I understand, enable.",
                                confirmBtnType: "btn-primary"
                            })
                            .then((confirmed) => {
                                if (confirmed) {
                                    settingsService.saveSetting("WhileLoopEnabled", true);
                                }
                            });
                    }
                };

                $scope.recalculateQuoteIds = () => {
                    utilityService
                        .showConfirmationModal({
                            title: "Recalculate Quote IDs",
                            question: `Are you sure you want to recalculate your quote IDs?`,
                            confirmLabel: "Recalculate",
                            confirmBtnType: "btn-danger"
                        })
                        .then((confirmed) => {
                            if (confirmed) {
                                backendCommunicator.fireEvent("recalc-quote-ids");
                            }
                        });
                };

            }
        });
}());
