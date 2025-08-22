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

    // --- FUNÇÃO MODIFICADA COM LÓGICA DE DEBUG ---
    func webView(_ webView: WKWebView, didFailProvisionalNavigation navigation: WKNavigation!, withError error: Error) {
        let nsError = error as NSError
        if nsError.code == NSURLErrorNotConnectedToInternet || nsError.code == NSURLErrorTimedOut || nsError.code == NSURLErrorCannotConnectToHost {
            
            // Tenta carregar o arquivo de teste
            if let errorUrl = Bundle.main.url(forResource: "public/offline-test", withExtension: "html") {
                // Se ENCONTROU o arquivo, carrega ele
                webView.loadFileURL(errorUrl, allowingReadAccessTo: errorUrl.deletingLastPathComponent())
            } else {
                // Se NÃO ENCONTROU o arquivo, carrega um HTML de erro diretamente na webview
                let htmlError = """
                <!DOCTYPE html>
                <html>
                <body style="background-color: #101212; color: #ff0000; font-family: monospace; font-size: 20px; padding: 20px;">
                <h1>DEBUG</h1>
                <p>Erro Crítico: O arquivo 'public/offline-test.html' NÃO foi encontrado no bundle do aplicativo.</p>
                <p>O caminho está incorreto.</p>
                </body>
                </html>
                """
                webView.loadHTMLString(htmlError, baseURL: nil)
            }
        }
    }
}