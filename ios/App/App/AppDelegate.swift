import UIKit
import Capacitor
import WebKit

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate, WKNavigationDelegate {

    var window: UIWindow?

    func application(
        _ application: UIApplication,
        didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?
    ) -> Bool {
        return true
    }

    // Intercepta erro de carregamento
    func webView(_ webView: WKWebView, didFail navigation: WKNavigation!, withError error: Error) {
        loadOfflinePage(webView)
    }

    func webView(_ webView: WKWebView, didFailProvisionalNavigation navigation: WKNavigation!, withError error: Error) {
        loadOfflinePage(webView)
    }

    private func loadOfflinePage(_ webView: WKWebView) {
        if let offlinePath = Bundle.main.path(forResource: "offline", ofType: "html", inDirectory: "public") {
            let offlineUrl = URL(fileURLWithPath: offlinePath)
            webView.loadFileURL(offlineUrl, allowingReadAccessTo: offlineUrl.deletingLastPathComponent())
        }
    }
}
