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
        excludeIOS11: true
      },
      fonts: {
        swfContainerId: 'fingerprintjs2',
        swfPath: 'flash/compiled/FontList.swf',
        userDefinedFonts: [],
        extendedJsFonts: false
      },
      screen: {
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
        'canvas': true,
        'screenResolution': true,
        'availableScreenResolution': true,
        'touchSupport': true,
        'plugins': true,
        'webgl': true,
        'audio': true,
        'language': true,
        'deviceMemory': true
      },
      NOT_AVAILABLE: 'not available',
      ERROR: 'error',
      EXCLUDED: 'excluded'
    }

    Fingerprint2.get(options, (components) => {
      console.log(JSON.stringify(components));
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
