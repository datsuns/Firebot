"use strict";

(function() {

    angular
        .module("firebotApp")
        .component("ttsSettings", {
            template: `
                <div>

                    <firebot-setting
                        name="{{'SETTINGS.TTS.TTS_VOICE.NAME' | translate }}"
                        description="{{'SETTINGS.TTS.TTS_VOICE.DESCRIPTION' | translate }}"
                    >
                        <firebot-select
                            options="ttsVoiceOptions"
                            ng-init="ttsVoice = getSelectedVoiceName()"
                            selected="ttsVoice"
                            on-update="settings.saveSetting('DefaultTtsVoiceId', option)"
                            right-justify="true"
                            aria-label="Choose your Text to Speech voice"
                        />
                    </firebot-setting>

                    <firebot-setting
                        name="{{'SETTINGS.TTS.TTS_VOLUME.NAME' | translate }}"
                        description="{{'SETTINGS.TTS.TTS_VOLUME.DESCRIPTION' | translate }}"
                    >
                        <div class="volume-slider-wrapper"  style="width: 75%">
                            <i class="fal fa-volume-down volume-low" style="font-size: 25px"></i>
                            <rzslider
                                rz-slider-model="ttsVolumeSlider.value"
                                rz-slider-options="ttsVolumeSlider.options"
                            ></rzslider>
                            <i class="fal fa-volume-up volume-high" style="font-size: 25px"></i>
                        </div>
                    </firebot-setting>

                    <firebot-setting
                        name="{{'SETTINGS.TTS.TTS_SPEAK_RATE.NAME' | translate }}"
                        description="{{'SETTINGS.TTS.TTS_SPEAK_RATE.DESCRIPTION' | translate }}"
                    >
                        <div class="volume-slider-wrapper" style="width: 75%">
                            <i class="fal fa-turtle volume-low" style="font-size: 25px"></i>
                            <rzslider
                                rz-slider-model="ttsRateSlider.value"
                                rz-slider-options="ttsRateSlider.options"
                            >
                            </rzslider>
                            <i class="fal fa-rabbit-fast volume-high" style="font-size: 25px"></i>
                        </div>
                    </firebot-setting>

                    <firebot-setting
                        name="{{'SETTINGS.TTS.TEST_TTS.NAME' | translate }}"
                        description="{{'SETTINGS.TTS.TEST_TTS.DESCRIPTION' | translate }}"
                    >
                        <firebot-button
                            text="{{'SETTINGS.TTS.SPEAK_TEST_MESSAGE' | translate }}"
                            ng-click="testTTS()"
                        />
                    </firebot-setting>

                </div>
          `,
            controller: function($scope, settingsService, ttsService, accountAccess, $timeout) {
                $scope.settings = settingsService;

                $scope.getSelectedVoiceName = () => {
                    const selectedVoiceId = settingsService.getSetting("DefaultTtsVoiceId");
                    const voice = ttsService.getVoiceById(selectedVoiceId);
                    return voice ? voice.name : "Unknown Voice";
                };

                $scope.ttsVoices = ttsService.getVoices();

                $scope.getSelectedVoiceName = () => {
                    const selectedVoiceId = settingsService.getSetting("DefaultTtsVoiceId");
                    const voice = ttsService.getVoiceById(selectedVoiceId);
                    return voice ? voice.name : "Unknown Voice";
                };

                $scope.ttsVoiceOptions = ttsService.getVoices().reduce((acc, v) => {
                    acc[v.id] = v.name;
                    return acc;
                }, {});

                $scope.ttsVolumeSlider = {
                    value: settingsService.getSetting("TtsVoiceVolume"),
                    options: {
                        floor: 0,
                        ceil: 1,
                        step: 0.1,
                        precision: 1,
                        ariaLabel: "Text to speech volume ",
                        translate: function(value) {
                            return Math.floor(value * 10);
                        },
                        onChange: (_, value) => {
                            settingsService.saveSetting("TtsVoiceVolume", value);
                        }
                    }
                };

                $scope.ttsRateSlider = {
                    value: settingsService.getSetting("TtsVoiceRate"),
                    options: {
                        floor: 0.1,
                        ceil: 10,
                        step: 0.1,
                        precision: 1,
                        ariaLabel: "Text to speech rate ",
                        onChange: (_, value) => {
                            settingsService.saveSetting("TtsVoiceRate", value);
                        }
                    }
                };

                const streamerName = accountAccess.accounts.streamer.username;

                const testTTSMessages = [
                    "I hope you are having a nice day.",
                    "It sure is nice to be able to talk.",
                    "I think you are awesome.",
                    "When do you go to the dentist? Tooth hurty. Ha ha.",
                    "This is a test message. Beep boop.",
                    `I'm sorry, ${streamerName}. I'm afraid I can't do that.`
                ];

                $scope.testTTS = async () => {
                    await ttsService.readText(testTTSMessages[Math.floor(Math.random() * testTTSMessages.length)], "default", false);
                };

                $scope.refreshSliders = function() {
                    $timeout(function() {
                        $scope.$broadcast('rzSliderForceRender');
                    });
                };
            }
        });
}());
