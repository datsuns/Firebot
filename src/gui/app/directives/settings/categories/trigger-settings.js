"use strict";

(function () {

    angular
        .module("firebotApp")
        .component("triggerSettings", {
            template: `
                <div>
                    <firebot-setting-category
                        name="{{'SETTINGS.TRIGGERS.COMMANDS_CATEGORY' | translate}}"
                    />
                    <firebot-setting
                        name="{{'SETTINGS.TRIGGERS.DEFAULT_MODE_FOR_NEW_COMMANDS.NAME' | translate }}"
                        description="{{'SETTINGS.TRIGGERS.DEFAULT_MODE_FOR_NEW_COMMANDS.DESCRIPTION' | translate }}"
                    >
                        <firebot-select
                            options="{ true: 'Advanced', false: 'Simple' }"
                            ng-init="selectedCmdMode = settings.getSetting('DefaultToAdvancedCommandMode')"
                            selected="selectedCmdMode"
                            on-update="settings.saveSetting('DefaultToAdvancedCommandMode', option === 'true')"
                            right-justify="true"
                            aria-label="{{'SETTINGS.TRIGGERS.DEFAULT_MODE_FOR_NEW_COMMANDS.NAME' | translate }}"
                        />
                    </firebot-setting>

                    <firebot-setting
                        name="{{'SETTINGS.TRIGGERS.ALLOW_SHARED_CHAT_TO_TRIGGER_COMMANDS.NAME' | translate }}"
                        description="{{'SETTINGS.TRIGGERS.ALLOW_SHARED_CHAT_TO_TRIGGER_COMMANDS.DESCRIPTION' | translate }}"
                    >
                        <firebot-select
                            options="{ true: 'Yes', false: 'No' }"
                            ng-init="allowSharedChatCommands = settings.getSetting('AllowCommandsInSharedChat')"
                            selected="allowSharedChatCommands"
                            on-update="settings.saveSetting('AllowCommandsInSharedChat', option === 'true')"
                            right-justify="true"
                            aria-label="{{'SETTINGS.TRIGGERS.ALLOW_SHARED_CHAT_TO_TRIGGER_COMMANDS.NAME' | translate }}"
                        />
                    </firebot-setting>

                    <firebot-setting-category
                        name="{{'SETTINGS.TRIGGERS.EVENTS_CATEGORY' | translate}}"
                        pad-top="true"
                    />
                    <firebot-setting
                        name="{{'SETTINGS.TRIGGERS.IGNORE_RELATED_GIFT_SUB_EVENTS.NAME' | translate }}"
                        description="{{'SETTINGS.TRIGGERS.IGNORE_RELATED_GIFT_SUB_EVENTS.DESCRIPTION' | translate }}"
                    >
                        <firebot-select
                            options="{ true: 'Yes', false: 'No' }"
                            ng-init="ignoreSubEvents = settings.getSetting('IgnoreSubsequentSubEventsAfterCommunitySub')"
                            selected="ignoreSubEvents"
                            on-update="settings.saveSetting('IgnoreSubsequentSubEventsAfterCommunitySub', option === 'true')"
                            right-justify="true"
                            aria-label="{{'SETTINGS.TRIGGERS.IGNORE_RELATED_GIFT_SUB_EVENTS.NAME' | translate }}"
                        />
                    </firebot-setting>

                    <firebot-setting
                        name="{{'SETTINGS.TRIGGERS.UPCOMING_SCHEDULED_AD_BREAK_TRIGGER.NAME' | translate }}"
                        description="{{'SETTINGS.TRIGGERS.UPCOMING_SCHEDULED_AD_BREAK_TRIGGER.DESCRIPTION' | translate }}"
                    >
                        <firebot-select
                            options="{ 0: 'Disabled', 1: '1 minute', 3: '3 minutes', 5: '5 minutes', 10: '10 minutes', 15: '15 minutes', 20: '20 minutes' }"
                            ng-init="triggerUpcomingAdBreakMinutes = settings.getSetting('TriggerUpcomingAdBreakMinutes')"
                            selected="triggerUpcomingAdBreakMinutes"
                            on-update="settings.saveSetting('TriggerUpcomingAdBreakMinutes', option)"
                            right-justify="true"
                            aria-label="{{'SETTINGS.TRIGGERS.UPCOMING_SCHEDULED_AD_BREAK_TRIGGER.NAME' | translate }}"
                        />
                    </firebot-setting>
                </div>
          `,
            controller: function ($scope, settingsService) {
                $scope.settings = settingsService;
            }
        });
}());
