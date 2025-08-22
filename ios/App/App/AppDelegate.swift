import UIKit
import Capacitor
import WebKit

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate, WKNavigationDelegate {

    var window: UIWindow?

    func application(_ application: UIApplication,
                     didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {

        // Define navigationDelegate do WebView do Capacitor
        if let bridgeVC = self.window?.rootViewController as? CAPBridgeViewController {
            bridgeVC.bridge?.webView?.navigationDelegate = self
        }

        return true
    }

    func applicationWillResignActive(_ application: UIApplication) {}
    func applicationDidEnterBackground(_ application: UIApplication) {}
    func applicationWillEnterForeground(_ application: UIApplication) {}
    func applicationDidBecomeActive(_ application: UIApplication) {}
    func applicationWillTerminate(_ application: UIApplication) {}

    func application(_ app: UIApplication,
                     open url: URL,
                     options: [UIApplication.OpenURLOptionsKey: Any] = [:]) -> Bool {
        return ApplicationDelegateProxy.shared.application(app, open: url, options: options)
    }

    func application(_ application: UIApplication,
                     continue userActivity: NSUserActivity,
                     restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void) -> Bool {
        return ApplicationDelegateProxy.shared.application(application,
                                                             continue: userActivity,
                                                             restorationHandler: restorationHandler)
    }

    // --- FALLBACK OFFLINE ---
    func webView(_ webView: WKWebView,
                 didFailProvisionalNavigation navigation: WKNavigation!,
                 withError error: Error) {

        let nsError = error as NSError
        if nsError.code == NSURLErrorNotConnectedToInternet ||
           nsError.code == NSURLErrorTimedOut ||
           nsError.code == NSURLErrorCannotConnectToHost {

            if let offlineUrl = Bundle.main.url(forResource: "offline", withExtension: "html") {
                // Carrega o offline.html local
                webView.loadFileURL(offlineUrl, allowingReadAccessTo: offlineUrl.deletingLastPathComponent())
            } else {
                // DEBUG caso o offline.html não esteja no bundle
                let htmlError = """
                <!DOCTYPE html>
                <html>
                <body style="background-color:#101212; color:#ff0000; font-family: monospace; padding:20px;">
                <h1>DEBUG</h1>
                <p>Erro: 'offline.html' NÃO foi encontrado no bundle.</p>
                </body>
                </html>
                """
                webView.loadHTMLString(htmlError, baseURL: nil)
            }
        }
    }
}
