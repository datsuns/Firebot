"use strict";

(function() {

    angular
        .module("firebotApp")
        .component("overlaySettings", {
            template: `
                <div>

                    <firebot-setting
                        name="{{'SETTINGS.OVERLAY.OVERLAY_URL.NAME' | translate }}"
                        description="{{'SETTINGS.OVERLAY.OVERLAY_URL.DESCRIPTION' | translate }}"
                    >
                        <firebot-button
                            text="Get Overlay Path"
                            ng-click="showOverlayInfoModal()"
                        />
                    </firebot-setting>

                    <firebot-setting
                        name="{{'SETTINGS.OVERLAY.OVERLAY_INSTANCES.NAME' | translate }}"
                        description="{{'SETTINGS.OVERLAY.OVERLAY_INSTANCES.DESCRIPTION' | translate }}"
                    >
                        <span
                            style="padding-right: 10px"
                            ng-if="settings.getSetting('UseOverlayInstances')"
                        >
                            <a href ng-click="showEditOverlayInstancesModal()">Edit Instances</a>
                        </span>
                        <firebot-select
                            options="{ true: 'On', false: 'Off' }"
                            ng-init="overlayInstances = settings.getSetting('UseOverlayInstances')"
                            selected="overlayInstances"
                            on-update="settings.saveSetting('UseOverlayInstances', option === 'true')"
                            right-justify="true"
                            aria-label="enable or disable Overlay Instances"
                        />
                    </firebot-setting>

                    <firebot-setting
                        name="{{'SETTINGS.OVERLAY.FORCE_EFFECTS_TO_CONTINUE.NAME' | translate }}"
                        description="{{'SETTINGS.OVERLAY.FORCE_EFFECTS_TO_CONTINUE.DESCRIPTION' | translate }}"
                    >
                        <toggle-button
                            toggle-model="settings.getSetting('ForceOverlayEffectsToContinueOnRefresh')"
                            on-toggle="settings.saveSetting('ForceOverlayEffectsToContinueOnRefresh', !settings.getSetting('ForceOverlayEffectsToContinueOnRefresh'))"
                            font-size="40"
                            accessibility-label="(settings.getSetting('ForceOverlayEffectsToContinueOnRefresh') ? 'Enabled' : 'Disabled') + '
                             When refreshing an overlay or using the Clear Effects effect on it, this will force any Play Video or Play
                             Sound effects currently playing on that overlay to continue to the next effect, even if they\\'re set to wait.'"
                        />
                    </firebot-setting>

                    <firebot-setting
                        name="{{'SETTINGS.OVERLAY.FONT_MANAGEMENT.NAME' | translate }}"
                        description="{{'SETTINGS.OVERLAY.FONT_MANAGEMENT.DESCRIPTION' | translate }}"
                    >
                        <firebot-button
                            text="Manage Fonts"
                            ng-click="showFontManagementModal()"
                        />
                    </firebot-setting>

                </div>
          `,
            controller: function($scope, settingsService, utilityService) {
                $scope.settings = settingsService;

                $scope.showOverlayInfoModal = function(overlayInstance) {
                    utilityService.showOverlayInfoModal(overlayInstance);
                };

                $scope.showEditOverlayInstancesModal = function() {
                    utilityService.showModal({
                        component: "editOverlayInstancesModal"
                    });
                };

                $scope.showFontManagementModal = function() {
                    utilityService.showModal({
                        component: "fontManagementModal",
                        size: "sm"
                    });
                };
            }
        });
}());
