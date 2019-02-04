import { Component, OnInit } from '@angular/core';
import * as Fingerprint2 from 'fingerprintjs2';
import * as UAParser from 'ua-parser-js';
import { fromEvent, BehaviorSubject } from 'rxjs'
import { map, delay, tap } from 'rxjs/operators'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  calculateFingerPrint() {
    var fp;
    var options = {
      preprocessor: function (key, value) {
        if (key == "userAgent") {
          var parser = new UAParser(value); // https://github.com/faisalman/ua-parser-js
          var userAgentMinusVersion = parser.getOS().name + ' ' + parser.getBrowser().name
          return userAgentMinusVersion
        }
        return value
      },
      audio: {
        timeout: 1000,
        // On iOS 11, audio context can only be used in response to user interaction.
        // We require users to explicitly enable audio fingerprinting on iOS 11.
        // See https://stackoverflow.com/questions/46363048/onaudioprocess-not-called-on-ios11#46534088
        excludeIOS11: true
      },
      fonts: {
        swfContainerId: 'fingerprintjs2',
        swfPath: 'flash/compiled/FontList.swf',
        userDefinedFonts: [],
        extendedJsFonts: false
      },
      screen: {
        // To ensure consistent fingerprints when users rotate their mobile devices
        detectScreenOrientation: true
      },
      plugins: {
        sortPluginsFor: [/palemoon/i],
        excludeIE: false
      },
      extraComponents: [],
      excludes: {
        // Unreliable on Windows, see https://github.com/Valve/fingerprintjs2/issues/375
        'enumerateDevices': true,
        // devicePixelRatio depends on browser zoom, and it's impossible to detect browser zoom
        'pixelRatio': true,
        // DNT depends on incognito mode for some browsers (Chrome) and it's impossible to detect incognito mode
        'doNotTrack': true,
        // uses js fonts already
        'fontsFlash': true,
        'screenResolution': true,
        'availableScreenResolution': true,
        'canvas': true,
        'touchSupport': true,
        'plugins': true,
      },
      NOT_AVAILABLE: 'not available',
      ERROR: 'error',
      EXCLUDED: 'excluded'
    }

    Fingerprint2.get(options, (components) => {
      var murmur = Fingerprint2.x64hash128(components.map(function (pair) { return pair.value }).join(''), 31)
      console.log(murmur);
    })
  }

  ngOnInit() {
    setTimeout(() => {
      this.calculateFingerPrint();
    }, 2000)

    fromEvent(window, 'resize')
      .pipe(
        map(this.calculateFingerPrint)
      )
      .subscribe()

  }

}
