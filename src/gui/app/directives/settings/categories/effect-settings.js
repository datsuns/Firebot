"use strict";

(function () {

    angular
        .module("firebotApp")
        .component("effectSettings", {
            template: `
                <div>
                    <firebot-setting
                        name="{{'SETTINGS.EFFECTS.DEFAULT_EFFECT_LABELS.NAME' | translate }}"
                        description="{{'SETTINGS.EFFECTS.DEFAULT_EFFECT_LABELS.DESCRIPTION' | translate }}"
                    >
                        <firebot-select
                            options="{ true: 'On', false: 'Off' }"
                            ng-init="effectLabelsEnabled = settings.getSetting('DefaultEffectLabelsEnabled')"
                            selected="effectLabelsEnabled"
                            on-update="settings.saveSetting('DefaultEffectLabelsEnabled', option === 'true')"
                            right-justify="true"
                        />
                    </firebot-setting>
                </div>
          `,
            controller: function ($scope, settingsService) {
                $scope.settings = settingsService;
            }
        });
}());
