import UIKit
import WebKit

class ViewController: UIViewController {
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
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    override func prefersStatusBarHidden() -> Bool {
        return true
    }
}

