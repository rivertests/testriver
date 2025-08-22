import UIKit
import Capacitor
import WebKit

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate, WKNavigationDelegate {

    var window: UIWindow?

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        return true
    }

    func applicationWillResignActive(_ application: UIApplication) {}
    func applicationDidEnterBackground(_ application: UIApplication) {}
    func applicationWillEnterForeground(_ application: UIApplication) {}

    func applicationDidBecomeActive(_ application: UIApplication) {
        if let bridgeVC = self.window?.rootViewController as? CAPBridgeViewController {
            bridgeVC.bridge?.webView?.navigationDelegate = self
        }
    }

    func applicationWillTerminate(_ application: UIApplication) {}

    func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey: Any] = [:]) -> Bool {
        return ApplicationDelegateProxy.shared.application(app, open: url, options: options)
    }

    func application(_ application: UIApplication, continue userActivity: NSUserActivity, restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void) -> Bool {
        return ApplicationDelegateProxy.shared.application(application, continue: userActivity, restorationHandler: restorationHandler)
    }

    // --- LÓGICA DE FALLBACK OFFLINE ---
    func webView(_ webView: WKWebView, didFailProvisionalNavigation navigation: WKNavigation!, withError error: Error) {
        let nsError = error as NSError
        if nsError.code == NSURLErrorNotConnectedToInternet || nsError.code == NSURLErrorTimedOut || nsError.code == NSURLErrorCannotConnectToHost {
            
            // Tenta carregar o arquivo no caminho que o Capacitor cria (public/offline.html)
            if let errorUrl = Bundle.main.url(forResource: "public/offline", withExtension: "html") {
                webView.loadFileURL(errorUrl, allowingReadAccessTo: errorUrl.deletingLastPathComponent())
            } else {
                // Se não encontrar, mostra o erro de debug
                let htmlError = """
                <!DOCTYPE html><html><body style="background-color:#101212;color:#ff0000;font-family:monospace;padding:20px;">
                <h1>DEBUG</h1><p>Erro Crítico: O arquivo 'public/offline.html' NÃO foi encontrado no bundle do aplicativo.</p>
                </body></html>
                """
                webView.loadHTMLString(htmlError, baseURL: nil)
            }
        }
    }
}