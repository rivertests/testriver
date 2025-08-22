package br.com.inteligenciatitan.app;

import android.content.Context;
import android.graphics.Color;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.Bundle;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

    private static final String ONLINE_URL = "https://inteligenciatitan.com.br";
    private static final String OFFLINE_PAGE = "file:///android_asset/www/offline.html";

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        WebView webView = this.getBridge().getWebView();
        webView.setBackgroundColor(Color.BLACK);

        // Evita glow e scroll estranho
        webView.setOverScrollMode(WebView.OVER_SCROLL_NEVER);
        webView.setOnLongClickListener(v -> true);
        webView.setLongClickable(false);

        // CONFIGURAÇÕES ESSENCIAIS PARA RESPONSIVIDADE
        WebSettings webSettings = webView.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setLoadWithOverviewMode(true);
        webSettings.setUseWideViewPort(true);
        webSettings.setLayoutAlgorithm(WebSettings.LayoutAlgorithm.NORMAL);
        webSettings.setDomStorageEnabled(true);
        webSettings.setSupportZoom(false);
        webSettings.setBuiltInZoomControls(false);
        webSettings.setDisplayZoomControls(false);

        webView.setWebViewClient(new WebViewClient() {

            @Override
            public void onReceivedError(WebView view, WebResourceRequest request, android.webkit.WebResourceError error) {
                if (request.getUrl().toString().equals(ONLINE_URL)) {
                    view.loadUrl(OFFLINE_PAGE);
                }
            }

            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                return false;
            }

            @Override
            public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);

                // Injeta CSS para remover hover azul e outline
                String cssJs = "javascript:(function() {" +
                        "var css = '* { -webkit-tap-highlight-color: transparent !important; outline: none !important; } html, body { overflow-x: hidden; overflow-y: auto; height: 100%; }';" +
                        "var style = document.createElement('style');" +
                        "style.type = 'text/css';" +
                        "style.appendChild(document.createTextNode(css));" +
                        "document.head.appendChild(style);" +

                        // Força altura da página para caber na tela
                        "document.body.style.height = window.innerHeight + 'px';" +
                        "document.documentElement.style.height = window.innerHeight + 'px';" +
                        "})()";
                view.loadUrl(cssJs);
            }
        });

        // Carrega online ou offline
        if (isConnected()) {
            webView.loadUrl(ONLINE_URL);
        } else {
            webView.loadUrl(OFFLINE_PAGE);
        }
    }

    private boolean isConnected() {
        ConnectivityManager cm = (ConnectivityManager) getSystemService(Context.CONNECTIVITY_SERVICE);
        if (cm != null) {
            NetworkInfo activeNetwork = cm.getActiveNetworkInfo();
            return activeNetwork != null && activeNetwork.isConnected();
        }
        return false;
    }
}
