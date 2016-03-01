import UIKit
import WebKit

class ViewController: UIViewController, WKUIDelegate {
    var webview : WKWebView?

    override func viewDidLoad() {
        super.viewDidLoad()
        
        self.webview = WKWebView()
        self.view = self.webview
        
        // If a URL is provided in the app settings, put the WebView there
        // Otherwise, put it at the app bundle's www index
        let defaults = NSUserDefaults.standardUserDefaults()
        let wwwSource = defaults.stringForKey("source_preference")
        let bundleSource = NSBundle.mainBundle().pathForResource("horizontal_playground_compressed", ofType: "html", inDirectory: "playgrounds")

        let url = (wwwSource != nil && wwwSource!.characters.count > 0) ? NSURL(string:wwwSource!) : NSURL.fileURLWithPath(bundleSource!)
        let req = NSURLRequest(URL:url!)
        webview!.loadRequest(req)
        webview!.UIDelegate = self
    }
    
    func webView(webView: WKWebView, runJavaScriptTextInputPanelWithPrompt prompt: String, defaultText: String?, initiatedByFrame frame: WKFrameInfo, completionHandler: (String?) -> Void) {
        let alertController = UIAlertController(title: "", message: prompt, preferredStyle: .Alert)
        weak var alertTextField: UITextField!
        alertController.addTextFieldWithConfigurationHandler { textField in
            textField.text = defaultText
            alertTextField = textField
        }
        alertController.addAction(UIAlertAction(title: "Cancel", style: .Cancel, handler: { action in
            completionHandler(nil)
        }))
        alertController.addAction(UIAlertAction(title: "OK", style: .Default, handler: { action in
            completionHandler(alertTextField.text)
        }))
        self.presentViewController(alertController, animated: true, completion: nil)
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    override func prefersStatusBarHidden() -> Bool {
        return true
    }
}

