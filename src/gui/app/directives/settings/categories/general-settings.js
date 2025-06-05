"use strict";

(function () {
    angular.module("firebotApp").component("generalSettings", {
        template: `
                <div>
                    <firebot-setting
                        name="{{'SETTINGS.GENERAL.THEME.NAME' | translate }}"
                        description="{{'SETTINGS.GENERAL.THEME.DESCRIPTION' | translate }}"
                    >
                        <firebot-select
                            aria-label="{{'SETTINGS.GENERAL.THEME.NAME' | translate }}"
                            options="['Light', 'Midnight', 'Obsidian']"
                            ng-init="selectedTheme = settings.getSetting('Theme')"
                            selected="selectedTheme"
                            on-update="settings.saveSetting('Theme', option)"
                        right-justify="true"
                    />
                    </firebot-setting>

                    <firebot-setting
                        name="{{'SETTINGS.GENERAL.LANGUAGE.NAME' | translate }}"
                        description="{{'SETTINGS.GENERAL.LANGUAGE.DESCRIPTION' | translate }}"
                    >
                        <firebot-select
                            aria-label="{{'SETTINGS.GENERAL.LANGUAGE.NAME' | translate }}"
                            options="availableLanguages"
                            ng-init="selectedLang = settings.getSetting('UiLanguage')"
                            selected="selectedLang"
                            on-update="updateUiLanguage(option)"
                            right-justify="true"
                        />
                    </firebot-setting>

                    <firebot-setting
                        name="{{'SETTINGS.GENERAL.MINIMIZE_TO_TRAY.NAME' | translate }}"
                        description="{{'SETTINGS.GENERAL.MINIMIZE_TO_TRAY.DESCRIPTION' | translate }}"
                    >
                        <toggle-button
                            toggle-model="settings.getSetting('MinimizeToTray')"
                            on-toggle="settings.saveSetting('MinimizeToTray', !settings.getSetting('MinimizeToTray'))"
                            font-size="40"
                            aria-label="{{'SETTINGS.GENERAL.MINIMIZE_TO_TRAY.DESCRIPTION' | translate}}"
                            accessibility-label="(settings.getSetting('MinimizeToTray') ? 'Enabled' : 'Disabled') + ' When minimized, Firebot will minimize to tray instead of task bar'"
                        />
                    </firebot-setting>

                    <firebot-setting
                        name="{{'SETTINGS.GENERAL.CONNECTION_SOUNDS.NAME' | translate }}"
                        description="{{'SETTINGS.GENERAL.CONNECTION_SOUNDS.DESCRIPTION' | translate }}"
                    >
                        <toggle-button
                            toggle-model="settings.getSetting('SoundsEnabled') === 'On'"
                            on-toggle="settings.saveSetting('SoundsEnabled', settings.getSetting('SoundsEnabled') === 'On' ? 'Off' : 'On')"
                            font-size="40"
                            aria-label="{{'SETTINGS.GENERAL.CONNECTION_SOUNDS.DESCRIPTION' | translate}}"
                            accessibility-label="(settings.getSetting('SoundsEnabled') === 'On' ? 'Enabled' : 'Disabled') + ' Get audible alerts when Firebot connects or disconnects.'"
                        />
                    </firebot-setting>

                    <firebot-setting
                        name="{{'SETTINGS.GENERAL.SOUND_OUTPUT_DEVICE.NAME' | translate }}"
                        description="Change what output device app sounds (ie connect/disconnect sounds) and Play Sound Effects are sent to."
                    >
                        <div class="dropdown">
                            <button
                                class="btn btn-default dropdown-toggle"
                                type="button"
                                id="options-emulation"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="true"
                                aria-label="Choose your audio output device {{settings.getSetting('AudioOutputDevice').label}}"
                            >
                                <span class="dropdown-text">{{settings.getSetting('AudioOutputDevice').label}}</span>
                                <span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu right-justified-dropdown">
                                <li ng-repeat="device in audioOutputDevices">
                                    <a
                                        href
                                        ng-click="settings.saveSetting('AudioOutputDevice', device)"
                                    >{{device.label}}</a>
                                </li>
                                <li class="divider"></li>
                                <li
                                    role="menuitem"
                                    ng-click="settings.saveSetting('AudioOutputDevice', {label: ('SETTINGS.GENERAL.SOUND_OUTPUT_DEVICE.SEND_TO_OVERLAY' | translate), deviceId: 'overlay'})"
                                >
                                    <a href>{{'SETTINGS.GENERAL.SOUND_OUTPUT_DEVICE.SEND_TO_OVERLAY' | translate}}</a>
                                </li>
                            </ul>
                        </div>
                    </firebot-setting>

                    <firebot-setting
                        name="{{'SETTINGS.GENERAL.BETA_NOTIFICATIONS.NAME' | translate }}"
                        description="{{'SETTINGS.GENERAL.BETA_NOTIFICATIONS.DESCRIPTION' | translate }}"
                    >
                        <toggle-button
                            toggle-model="settings.getSetting('NotifyOnBeta')"
                            on-toggle="settings.saveSetting('NotifyOnBeta', !settings.getSetting('NotifyOnBeta'))"
                            font-size="40"
                            aria-label="{{'SETTINGS.GENERAL.BETA_NOTIFICATIONS.DESCRIPTION' | translate }}"
                            accessibility-label="(settings.getSetting('NotifyOnBeta') ? 'Enabled' : 'Disabled') + ' Firebot automatically updates to new stable versions. It does not automatically update to betas or major new
                        releases however. Enable if you want to be notified of new beta releases.'"
                        />
                    </firebot-setting>

                    <firebot-setting
                        name="{{'SETTINGS.GENERAL.FEATURE_MY_STREAM.NAME' | translate }}"
                        description="{{'SETTINGS.GENERAL.FEATURE_MY_STREAM.DESCRIPTION_PREFIX' | translate}}"
                    >

                        <setting-description-addon>
                            <div style="margin-top: 10px;">
                                <span>{{'SETTINGS.GENERAL.FEATURE_MY_STREAM.DESCRIPTION_PREFIX' | translate}} <a
                                    class="clickable"
                                    ng-click="openLink('https://firebot.app/watch')"
                                >{{'SETTINGS.GENERAL.FEATURE_MY_STREAM.LINK_LABEL' | translate}}</a> {{'SETTINGS.GENERAL.FEATURE_MY_STREAM.AFTER_LINK' | translate}}
                            </div>
                        </setting-description-addon>

                        <toggle-button
                            toggle-model="settings.getSetting('WebOnlineCheckin')"
                            on-toggle="settings.saveSetting('WebOnlineCheckin', !settings.getSetting('WebOnlineCheckin'))"
                            font-size="40"
                            aria-label="{{'SETTINGS.GENERAL.FEATURE_MY_STREAM.DESCRIPTION_PREFIX' | translate}} {{'SETTINGS.GENERAL.FEATURE_MY_STREAM.LINK_LABEL' | translate}} {{'SETTINGS.GENERAL.FEATURE_MY_STREAM.AFTER_LINK' | translate}}"
                            accessibility-label="(settings.getSetting('WebOnlineCheckin') ? 'Enabled' : 'Disabled') + ' Enable this setting to have your stream displayed on Firebot\\'s website when you\\'re live'"
                        />
                    </firebot-setting>

                    <firebot-setting
                        name="{{'SETTINGS.GENERAL.LIVE_STREAM_STATS.NAME' | translate }}"
                        description="{{'SETTINGS.GENERAL.LIVE_STREAM_STATS.DESCRIPTION' | translate }}"
                    >
                        <div>
                            <label class="control-fb control--checkbox"
                                >{{'SETTINGS.GENERAL.LIVE_STREAM_STATS.UPTIME' | translate}}
                                <input
                                    type="checkbox"
                                    ng-click="settings.saveSetting('ShowUptimeStat', !settings.getSetting('ShowUptimeStat'))"
                                    ng-checked="settings.getSetting('ShowUptimeStat')"
                                    aria-label="{{'SETTINGS.GENERAL.LIVE_STREAM_STATS.UPTIME' | translate}}"
                                />
                                <div class="control__indicator"></div>
                            </label>
                            <label class="control-fb control--checkbox"
                                >{{'SETTINGS.GENERAL.LIVE_STREAM_STATS.VIEWER_COUNT' | translate}}
                                <input
                                    type="checkbox"
                                    ng-click="settings.saveSetting('ShowViewerCountStat', !settings.getSetting('ShowViewerCountStat'))"
                                    ng-checked="settings.getSetting('ShowViewerCountStat')"
                                    aria-label="{{'SETTINGS.GENERAL.LIVE_STREAM_STATS.VIEWER_COUNT' | translate}}"
                                />
                                <div class="control__indicator"></div>
                            </label>
                            <label class="control-fb control--checkbox"
                                >{{'SETTINGS.GENERAL.LIVE_STREAM_STATS.HYPE_TRAINS' | translate}}
                                <input
                                    type="checkbox"
                                    ng-click="settings.saveSetting('ShowHypeTrainIndicator', !settings.getSetting('ShowHypeTrainIndicator'))"
                                    ng-checked="settings.getSetting('ShowHypeTrainIndicator')"
                                    aria-label="{{'SETTINGS.GENERAL.LIVE_STREAM_STATS.HYPE_TRAINS' | translate}}"
                                />
                                <div class="control__indicator"></div>
                            </label>
                            <label class="control-fb control--checkbox"
                                >{{'SETTINGS.GENERAL.LIVE_STREAM_STATS.AD_BREAKS' | translate}}
                                <input
                                    type="checkbox"
                                    ng-click="settings.saveSetting('ShowAdBreakIndicator', !settings.getSetting('ShowAdBreakIndicator'))"
                                    ng-checked="settings.getSetting('ShowAdBreakIndicator')"
                                    aria-label="{{'SETTINGS.GENERAL.LIVE_STREAM_STATS.AD_BREAKS' | translate}}"
                                />
                                <div class="control__indicator"></div>
                            </label>
                        </div>
                    </firebot-setting>

                    <firebot-setting
                        name="{{'SETTINGS.GENERAL.INACTIVE_VIEWER_TIME.NAME' | translate }}"
                        description="{{'SETTINGS.GENERAL.INACTIVE_VIEWER_TIME.DESCRIPTION' | translate }}"
                    >
                        <firebot-select
                            options="[5,10,15,20,25,30,35,40,45,50,55,60]"
                            ng-init="selectedTimeout = settings.getSetting('ActiveChatUserListTimeout')"
                            selected="selectedTimeout"
                            on-update="setActiveChatUserTimeout(option)"
                            right-justify="true"
                            aria-label="{{'SETTINGS.GENERAL.INACTIVE_VIEWER_TIME.NAME' | translate}}"
                        />
                        <span> {{'SETTINGS.GENERAL.INACTIVE_VIEWER_TIME.MINUTES' | translate}}</span>
                    </firebot-setting>

                    <firebot-setting
                        name="{{'SETTINGS.GENERAL.OPEN_STREAM_PREVIEW_ON_LAUNCH.NAME' | translate }}"
                        description="{{'SETTINGS.GENERAL.OPEN_STREAM_PREVIEW_ON_LAUNCH.DESCRIPTION' | translate }}"
                    >
                        <toggle-button
                            toggle-model="settings.getSetting('OpenStreamPreviewOnLaunch')"
                            on-toggle="settings.saveSetting('OpenStreamPreviewOnLaunch', !settings.getSetting('OpenStreamPreviewOnLaunch'))"
                            font-size="40"
                            accessibility-label="(settings.getSetting('OpenStreamPreviewOnLaunch') ? 'Enabled' : 'Disabled') + ' ' + ('SETTINGS.GENERAL.OPEN_STREAM_PREVIEW_ON_LAUNCH.NAME' | translate)"
                        />
                    </firebot-setting>
                </div>
          `,
        controller: function ($rootScope, $scope, settingsService, $q, $translate) {
            $scope.openLink = $rootScope.openLinkExternally;
            $scope.settings = settingsService;

            $scope.availableLanguages = { en: 'English', ja: '日本語' };

            $scope.updateUiLanguage = (lang) => {
                settingsService.saveSetting('UiLanguage', lang);
                $translate.use(lang);
                moment.locale(lang);
            };

            $scope.audioOutputDevices = [
                {
                    label: $translate.instant('SETTINGS.GENERAL.SOUND_OUTPUT_DEVICE.SYSTEM_DEFAULT'),
                    deviceId: "default"
                }
            ];

            $q.when(navigator.mediaDevices.enumerateDevices()).then((deviceList) => {
                deviceList = deviceList
                    .filter(
                        d => d.kind === "audiooutput" && d.deviceId !== "communications" && d.deviceId !== "default"
                    )
                    .map((d) => {
                        return { label: d.label, deviceId: d.deviceId };
                    });

                $scope.audioOutputDevices = $scope.audioOutputDevices.concat(deviceList);
            });

            $scope.setActiveChatUserTimeout = (value) => {
                if (value == null) {
                    value = "10";
                }
                settingsService.saveSetting("ActiveChatUserListTimeout", value);
            };
        }
    });
})();
