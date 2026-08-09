import { useState } from "react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/hooks/use-toast"
import {
  ExternalLink,
  Check,
  Copy,
  Zap,
  Code2,
  Layers,
  ShieldCheck,
  Clock,
  CheckCircle2,
  XCircle,
  Terminal,
  SlidersHorizontal,
  Info,
  Bug,
  BookOpen
} from "lucide-react"

interface DemoProduct {
  id: string
  identifier: string
  sku: string
  type: string
  title: string
  priceString: string
  period: string
  badge?: string
  savings?: string
  trial?: string
  description: string
  mockFeatures: string[]
}

interface DemoOffering {
  id: string
  name: string
  placement: string
  tag: string
  description: string
  packages: DemoProduct[]
}

const demoOfferings: Record<string, DemoOffering> = {
  default: {
    id: "default",
    name: "Default Offering (Remote Config)",
    placement: "main_paywall",
    tag: "Standard Audience",
    description: "Default offering served to general app users directly from RevenueCat dashboard.",
    packages: [
      {
        id: "pkg_monthly",
        identifier: "$rc_monthly",
        sku: "demo.app.monthly_sub",
        type: "MONTHLY",
        title: "Monthly Subscription SKU",
        priceString: "$9.99",
        period: "per month",
        description: "Standard monthly auto-renewable subscription mapped across iOS/Android.",
        mockFeatures: [
          "Cross-platform entitlement verification",
          "Automated receipt validation via RevenueCat backend",
          "Real-time customer status webhooks"
        ]
      },
      {
        id: "pkg_annual",
        identifier: "$rc_annual",
        sku: "demo.app.annual_pro",
        type: "ANNUAL",
        title: "Annual Pro Bundle SKU",
        priceString: "$79.99",
        period: "per year ($6.66/mo)",
        badge: "Sample Best Value",
        savings: "33% Dynamic Discount",
        trial: "7-Day Trial SKU",
        description: "Annual subscription with introductory trial configuration.",
        mockFeatures: [
          "Everything in Monthly SKU",
          "7-Day introductory free trial period",
          "Multi-device entitlement sharing",
          "Predictive churn & subscriber retention tracking"
        ]
      },
      {
        id: "pkg_lifetime",
        identifier: "$rc_lifetime",
        sku: "demo.app.lifetime_access",
        type: "LIFETIME",
        title: "Lifetime Non-Consumable SKU",
        priceString: "$199.00",
        period: "one-time payment",
        badge: "Non-Renewing",
        description: "Perpetual entitlement unlocked via non-consumable store product.",
        mockFeatures: [
          "Permanent non-expiring entitlement ('pro_entitlement')",
          "Zero renewal overhead & offline validation support",
          "Family sharing support via Apple StoreKit"
        ]
      }
    ]
  },
  promo: {
    id: "promo",
    name: "Experiment Cohort B (Targeted Offering)",
    placement: "onboarding_promo_placement",
    tag: "A/B Test Cohort",
    description: "Promotional offering delivered to targeted cohorts via RevenueCat Placements API.",
    packages: [
      {
        id: "pkg_promo_annual",
        identifier: "$rc_annual",
        sku: "demo.app.annual_special_promo",
        type: "ANNUAL",
        title: "Introductory Special SKU",
        priceString: "$59.99",
        period: "first year ($4.99/mo)",
        badge: "Remote A/B Test",
        savings: "Save 50% Remote Promo",
        trial: "14-Day Free Trial",
        description: "Dynamic discount served remotely to test conversion lift without releasing an update.",
        mockFeatures: [
          "Automated A/B experiment telemetry",
          "14-Day extended trial period",
          "Dynamic price localization per currency"
        ]
      }
    ]
  }
}

const sdkSnippets = {
  web: {
    title: "Web (JS/TS)",
    filename: "revenuecat-web.ts",
    snippet: `import { Purchases } from "@revenuecat/purchases-js";

// 1. Initialize RevenueCat Web Billing SDK
Purchases.configure({
  apiKey: "rcb_public_live_YOUR_API_KEY",
  appUserId: "user_vedant_123"
});

// 2. Fetch Offerings dynamically from RevenueCat
export async function fetchAndDisplayProducts() {
  try {
    const offerings = await Purchases.getSharedInstance().getOfferings({
      currency: "USD"
    });

    if (offerings.current !== null && offerings.current.availablePackages.length !== 0) {
      // Pass remote packages to your dynamic Paywall component
      displayPackages(offerings.current.availablePackages);
      
      // Or access convenience properties:
      const monthly = offerings.current.monthly?.webBillingProduct;
      const annual = offerings.current.annual?.webBillingProduct;
      console.log("Annual product price:", annual?.priceString);
    }
  } catch (error) {
    console.error("Failed to fetch RevenueCat offerings:", error);
  }
}

// 3. Trigger purchase for selected Package
export async function purchaseSelectedPackage(selectedPackage) {
  const { customerInfo } = await Purchases.getSharedInstance().purchase({
    rcPackage: selectedPackage
  });

  if (customerInfo.entitlements.active["pro_access"]) {
    // Entitlement unlocked without hardcoding product IDs!
  }
}`
  },
  swift: {
    title: "iOS (Swift)",
    filename: "PaywallController.swift",
    snippet: `import RevenueCat
import UIKit

class PaywallViewController: UIViewController {

    func loadOfferings() {
        Purchases.shared.getOfferings { (offerings, error) in
            guard let offerings = offerings, error == nil else { return }

            // 1. Access Current Default Offering
            if let currentOffering = offerings.current {
                let packages = currentOffering.availablePackages
                self.renderDynamicPaywall(with: packages)
            }

            // 2. Or query Placement-specific Offering
            if let placementOffering = offerings.currentOffering(forPlacement: "onboarding_paywall") {
                self.renderPlacementPaywall(offering: placementOffering)
            }
        }
    }

    func purchase(package: Package) {
        Purchases.shared.purchase(package: package) { (transaction, customerInfo, error, userCancelled) in
            if customerInfo?.entitlements["pro_access"]?.isActive == true {
                // Grant access
            }
        }
    }
}`
  },
  kotlin: {
    title: "Android (Kotlin)",
    filename: "PaywallActivity.kt",
    snippet: `import com.revenuecat.purchases.Purchases
import com.revenuecat.purchases.getOfferingsWith
import com.revenuecat.purchases.purchaseWith

class PaywallActivity : AppCompatActivity() {

    private fun fetchRevenueCatProducts() {
        // SDK pre-fetches offerings automatically on app launch
        Purchases.sharedInstance.getOfferingsWith(
            onError = { error ->
                Log.e("RevenueCat", "Error fetching offerings: \${error.message}")
            },
            onSuccess = { offerings ->
                offerings.current?.let { currentOffering ->
                    val availablePackages = currentOffering.availablePackages
                    // Dynamically bind to RecyclerView / Compose UI
                    updatePaywallUI(availablePackages)
                }
            }
        )
    }

    private fun purchasePackage(packageToBuy: Package) {
        Purchases.sharedInstance.purchaseWith(
            purchaseParams = PurchaseParams.Builder(this, packageToBuy).build(),
            onError = { error, userCancelled -> /* Handle error */ },
            onSuccess = { storeTransaction, customerInfo ->
                if (customerInfo.entitlements["pro_access"]?.isActive == true) {
                    // Unlock premium feature
                }
            }
        )
    }
}`
  },
  react_native: {
    title: "React Native",
    filename: "PaywallScreen.tsx",
    snippet: `import React, { useEffect, useState } from 'react';
import Purchases, { PurchasesPackage } from 'react-native-purchases';

export const PaywallScreen = () => {
  const [packages, setPackages] = useState<PurchasesPackage[]>([]);

  useEffect(() => {
    const fetchOfferings = async () => {
      try {
        const offerings = await Purchases.getOfferings();
        if (offerings.current !== null && offerings.current.availablePackages.length > 0) {
          setPackages(offerings.current.availablePackages);
        }
      } catch (e) {
        console.error("Error fetching offerings", e);
      }
    };
    fetchOfferings();
  }, []);

  const handlePurchase = async (pkg: PurchasesPackage) => {
    try {
      const { customerInfo } = await Purchases.purchasePackage(pkg);
      if (customerInfo.entitlements.active['pro_access']) {
        // Access Granted!
      }
    } catch (e) {
      if (!e.userCancelled) console.error(e);
    }
  };
};`
  }
}

export function RevenueCatProductsDrawer() {
  const [open, setOpen] = useState(false)
  const [selectedOfferingKey, setSelectedOfferingKey] = useState<string>("default")
  const [selectedPackageId, setSelectedPackageId] = useState<string>("pkg_annual")
  const [selectedSdk, setSelectedSdk] = useState<keyof typeof sdkSnippets>("web")
  const [copied, setCopied] = useState(false)
  const [isSimulating, setIsSimulating] = useState(false)
  const [debugLogs, setDebugLogs] = useState<Array<{ timestamp: string; message: string; type: "info" | "success" | "sdk" }>>([
    { timestamp: "00:00.00", message: "RevenueCat SDK initialized (Sandbox Mode: Enabled)", type: "info" },
    { timestamp: "00:00.12", message: "GET /v1/subscribers/{app_user_id}/offerings -> 200 OK (3 packages cached)", type: "sdk" },
    { timestamp: "00:00.15", message: "Active Offering: default ($rc_monthly, $rc_annual, $rc_lifetime)", type: "info" }
  ])
  const { toast } = useToast()

  const currentOffering = demoOfferings[selectedOfferingKey] || demoOfferings.default
  const activePackage = currentOffering.packages.find((p) => p.id === selectedPackageId) || currentOffering.packages[0]

  const handleCopyCode = () => {
    navigator.clipboard.writeText(sdkSnippets[selectedSdk].snippet)
    setCopied(true)
    toast({
      title: "SDK Snippet Copied!",
      description: `${sdkSnippets[selectedSdk].filename} copied to clipboard.`
    })
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSimulatePurchaseFlow = () => {
    setIsSimulating(true)
    const time = new Date().toTimeString().split(" ")[0]

    setTimeout(() => {
      setIsSimulating(false)
      const newLog = {
        timestamp: time,
        message: `Purchases.purchasePackage("${activePackage.identifier}") -> Success! Unlocked entitlement 'pro_access' for SKU: ${activePackage.sku} (${activePackage.priceString})`,
        type: "success" as const
      }
      setDebugLogs(prev => [newLog, ...prev])
      toast({
        title: "🧪 SDK Simulation Triggered",
        description: `Simulated RevenueCat purchase event for ${activePackage.title} (${activePackage.sku}). Check SDK Inspector logs.`
      })
    }, 700)
  }

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        {/* Floating Side Action Button (Docked on Right Screen Edge) */}
        <SheetTrigger asChild>
          <button
            aria-label="Open RevenueCat SDK & Displaying Products Architecture Demo"
            className="fixed right-0 top-1/2 -translate-y-1/2 z-40 group flex items-center bg-slate-900/95 hover:bg-slate-800 text-white pl-3.5 pr-2.5 py-3 rounded-l-2xl border-y border-l border-accent/40 shadow-[0_8px_30px_rgb(0,242,254,0.18)] hover:shadow-[0_8px_35px_rgb(0,242,254,0.35)] transition-all duration-300 backdrop-blur-md cursor-pointer"
          >
            <div className="flex flex-col items-center gap-1.5 mr-1.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent"></span>
              </span>
              <div className="p-1.5 rounded-lg bg-accent/15 text-accent group-hover:bg-accent group-hover:text-primary transition-smooth">
                <Code2 className="h-4 w-4" />
              </div>
            </div>
            <div className="hidden sm:flex flex-col text-left font-mono">
              <span className="text-[10px] font-bold text-accent uppercase tracking-wider flex items-center gap-1">
                <Terminal className="h-3 w-3 inline" /> Tech Lab
              </span>
              <span className="text-xs font-semibold text-white group-hover:text-accent transition-smooth">
                RevenueCat SDK Demo
              </span>
            </div>
          </button>
        </SheetTrigger>

        {/* Side Popup / Drawer Sheet */}
        <SheetContent
          side="right"
          className="w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl bg-slate-950/95 border-l border-accent/20 text-white backdrop-blur-xl p-0 flex flex-col z-50 overflow-hidden"
        >
          {/* Drawer Header */}
          <div className="p-6 pb-4 border-b border-accent/15 bg-slate-900/70">
            <div className="flex items-center justify-between gap-3 mb-2 pr-8">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-accent/15 border border-accent/30 text-accent flex-shrink-0">
                  <Terminal className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <SheetTitle className="text-lg sm:text-xl font-bold text-white font-mono flex items-center gap-2">
                      RevenueCat SDK: Displaying Products
                    </SheetTitle>
                    <Badge variant="outline" className="border-accent/30 text-accent text-[10px] font-mono bg-accent/10">
                      Developer Tech Demo
                    </Badge>
                  </div>
                  <SheetDescription className="text-xs text-gray-300 mt-1">
                    Engineering playground demonstrating dynamic Offerings, SDK methods, and remote product management
                  </SheetDescription>
                </div>
              </div>
            </div>

            {/* Prominent Demo Notice Banner */}
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-2.5 mt-3 flex items-start gap-2.5 text-xs text-amber-200/90">
              <Info className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-semibold text-amber-300 font-mono">Architecture Showcase (Sandbox Mode):</span>{" "}
                This component demonstrates how mobile & web apps integrate RevenueCat to decouple in-app store products from app binaries. No actual payments or donations are requested.
              </div>
            </div>

            {/* Official Doc Quick Link */}
            <div className="flex items-center justify-between bg-slate-900/90 border border-accent/20 rounded-lg px-3.5 py-2 transition-smooth mt-2.5">
              <span className="text-xs text-gray-300 font-medium flex items-center gap-1.5">
                <BookOpen className="h-3.5 w-3.5 text-accent" />
                Official Docs Reference:
              </span>
              <a
                href="https://www.revenuecat.com/docs/getting-started/displaying-products"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-accent hover:text-white font-mono inline-flex items-center gap-1 underline underline-offset-2 transition-smooth"
              >
                revenuecat.com/docs/displaying-products <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>

          {/* Drawer Body with Tabs */}
          <Tabs defaultValue="demo_catalog" className="flex-1 flex flex-col overflow-hidden">
            <div className="px-6 pt-3 border-b border-slate-800 bg-slate-900/40">
              <TabsList className="grid grid-cols-4 bg-slate-900 border border-accent/15 w-full">
                <TabsTrigger value="demo_catalog" className="text-xs font-mono data-[state=active]:bg-accent data-[state=active]:text-primary">
                  <Layers className="h-3.5 w-3.5 mr-1" /> Dynamic Offerings
                </TabsTrigger>
                <TabsTrigger value="inspector" className="text-xs font-mono data-[state=active]:bg-accent data-[state=active]:text-primary">
                  <Bug className="h-3.5 w-3.5 mr-1" /> SDK Inspector
                </TabsTrigger>
                <TabsTrigger value="code" className="text-xs font-mono data-[state=active]:bg-accent data-[state=active]:text-primary">
                  <Code2 className="h-3.5 w-3.5 mr-1" /> Code Snippets
                </TabsTrigger>
                <TabsTrigger value="best_practices" className="text-xs font-mono data-[state=active]:bg-accent data-[state=active]:text-primary">
                  <ShieldCheck className="h-3.5 w-3.5 mr-1" /> Best Practices
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Tab 1: Dynamic Offerings Catalog */}
            <TabsContent value="demo_catalog" className="flex-1 p-0 m-0 overflow-hidden">
              <ScrollArea className="h-[calc(100vh-275px)] px-6 py-4">
                <div className="space-y-5">
                  {/* Remote Offering Switcher */}
                  <div className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between flex-wrap gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono uppercase text-accent font-semibold">Simulated Offering Context:</span>
                        <Badge variant="secondary" className="text-[10px] bg-accent/15 text-accent font-mono">
                          Placement: {currentOffering.placement}
                        </Badge>
                      </div>
                      <div className="text-xs font-bold text-white mt-0.5">{currentOffering.name}</div>
                    </div>
                    <div className="flex gap-1.5">
                      <Button
                        size="sm"
                        variant={selectedOfferingKey === "default" ? "default" : "outline"}
                        onClick={() => {
                          setSelectedOfferingKey("default")
                          setSelectedPackageId("pkg_annual")
                        }}
                        className={`text-xs h-7 font-mono ${
                          selectedOfferingKey === "default"
                            ? "bg-accent text-primary"
                            : "border-slate-700 text-gray-300 hover:text-white"
                        }`}
                      >
                        Default Offering
                      </Button>
                      <Button
                        size="sm"
                        variant={selectedOfferingKey === "promo" ? "default" : "outline"}
                        onClick={() => {
                          setSelectedOfferingKey("promo")
                          setSelectedPackageId("pkg_promo_annual")
                        }}
                        className={`text-xs h-7 font-mono ${
                          selectedOfferingKey === "promo"
                            ? "bg-accent text-primary"
                            : "border-slate-700 text-gray-300 hover:text-white"
                        }`}
                      >
                        Targeted Cohort
                      </Button>
                    </div>
                  </div>

                  {/* Sample Product Packages */}
                  <div className="space-y-3">
                    {currentOffering.packages.map((pkg) => {
                      const isSelected = selectedPackageId === pkg.id
                      return (
                        <div
                          key={pkg.id}
                          onClick={() => setSelectedPackageId(pkg.id)}
                          className={`relative p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                            isSelected
                              ? "bg-accent/10 border-accent shadow-[0_0_20px_rgba(0,242,254,0.15)] ring-1 ring-accent"
                              : "bg-slate-900/60 border-slate-800 hover:border-accent/40 hover:bg-slate-900"
                          }`}
                        >
                          {pkg.badge && (
                            <div className="absolute -top-2.5 right-4">
                              <Badge className="bg-gradient-to-r from-accent to-cyan-400 text-primary font-bold text-[10px] uppercase font-mono px-2 py-0.5 shadow-md">
                                {pkg.badge}
                              </Badge>
                            </div>
                          )}

                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3">
                              <div
                                className={`w-5 h-5 rounded-full mt-0.5 border flex items-center justify-center transition-smooth ${
                                  isSelected
                                    ? "bg-accent border-accent text-primary"
                                    : "border-slate-600 bg-slate-800"
                                }`}
                              >
                                {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                              </div>
                              <div>
                                <div className="flex items-center gap-2 flex-wrap">
                                  <h4 className="font-bold text-white text-sm sm:text-base font-mono">{pkg.title}</h4>
                                  <span className="font-mono text-[10px] text-accent/80 bg-accent/10 px-1.5 py-0.5 rounded">
                                    {pkg.identifier}
                                  </span>
                                  <span className="font-mono text-[10px] text-gray-400 bg-slate-800 px-1.5 py-0.5 rounded">
                                    SKU: {pkg.sku}
                                  </span>
                                </div>
                                <p className="text-xs text-gray-400 mt-1">{pkg.description}</p>
                              </div>
                            </div>

                            <div className="text-right flex-shrink-0 ml-3">
                              <div className="text-lg font-black text-white font-mono">{pkg.priceString}</div>
                              <div className="text-[11px] text-gray-400 font-mono">{pkg.period}</div>
                            </div>
                          </div>

                          {/* Extra Badges / Trial info */}
                          {(pkg.savings || pkg.trial) && (
                            <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex flex-wrap gap-2 text-[11px]">
                              {pkg.savings && (
                                <span className="text-emerald-400 font-semibold flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-mono">
                                  <Zap className="h-3 w-3" /> {pkg.savings}
                                </span>
                              )}
                              {pkg.trial && (
                                <span className="text-accent font-semibold flex items-center gap-1 bg-accent/10 px-2 py-0.5 rounded border border-accent/20 font-mono">
                                  <Clock className="h-3 w-3" /> {pkg.trial}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>

                  {/* Selected Package Specifications */}
                  <Card className="bg-slate-900/80 border-accent/15 p-4">
                    <h5 className="text-xs font-bold text-accent font-mono uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Terminal className="h-3.5 w-3.5" /> Sample Entitlements Linked to {activePackage.identifier}:
                    </h5>
                    <ul className="space-y-1.5 text-xs text-gray-300">
                      {activePackage.mockFeatures.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="h-3.5 w-3.5 text-accent mt-0.5 flex-shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>

                  {/* SDK Simulation Button */}
                  <div className="space-y-2">
                    <Button
                      onClick={handleSimulatePurchaseFlow}
                      disabled={isSimulating}
                      className="w-full bg-accent text-primary font-bold hover:bg-accent/90 transition-bounce py-5 text-xs sm:text-sm font-mono shadow-[0_4px_20px_rgba(0,242,254,0.2)]"
                    >
                      {isSimulating ? (
                        <span className="flex items-center gap-2">
                          <span className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
                          Executing Purchases.purchasePackage("{activePackage.identifier}")...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Terminal className="h-4 w-4" />
                          Test SDK Purchase Flow Simulation ({activePackage.identifier})
                        </span>
                      )}
                    </Button>
                    <p className="text-[11px] text-center text-gray-400">
                      Tests the SDK completion callback and logs payload to the SDK Inspector tab.
                    </p>
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>

            {/* Tab 2: SDK Inspector & Event Logs */}
            <TabsContent value="inspector" className="flex-1 p-0 m-0 overflow-hidden">
              <ScrollArea className="h-[calc(100vh-275px)] px-6 py-4">
                <div className="space-y-4">
                  <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden font-mono text-xs">
                    <div className="bg-slate-950 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
                      <span className="text-accent flex items-center gap-1.5">
                        <Terminal className="h-3.5 w-3.5" /> SDK Event Console & Network Stream
                      </span>
                      <Badge variant="outline" className="text-[10px] border-emerald-500/40 text-emerald-400">
                        Live Sandbox
                      </Badge>
                    </div>
                    <div className="p-4 space-y-2 max-h-72 overflow-y-auto">
                      {debugLogs.map((log, i) => (
                        <div key={i} className="text-[11px] flex items-start gap-2 border-b border-slate-800/40 pb-1.5">
                          <span className="text-gray-500 select-none">[{log.timestamp}]</span>
                          <span className={log.type === "success" ? "text-emerald-400 font-semibold" : log.type === "sdk" ? "text-cyan-400" : "text-gray-300"}>
                            {log.message}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Simulated CustomerInfo JSON */}
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 font-mono text-[11px] text-slate-300 space-y-2">
                    <span className="text-accent font-bold block">Current CustomerInfo Object Schema:</span>
                    <pre className="bg-slate-950 p-3 rounded-lg border border-slate-800 overflow-x-auto text-cyan-300 leading-relaxed">
{`{
  "entitlements": {
    "active": {
      "pro_access": {
        "identifier": "pro_access",
        "isActive": true,
        "productIdentifier": "${activePackage.sku}",
        "willRenew": true,
        "periodType": "${activePackage.trial ? "TRIAL" : "NORMAL"}",
        "store": "APP_STORE_SANDBOX"
      }
    }
  },
  "originalAppUserId": "user_vedant_123",
  "activeSubscriptions": ["${activePackage.sku}"]
}`}
                    </pre>
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>

            {/* Tab 3: Code Snippets */}
            <TabsContent value="code" className="flex-1 p-0 m-0 overflow-hidden">
              <ScrollArea className="h-[calc(100vh-275px)] px-6 py-4">
                <div className="space-y-4">
                  {/* Language Selector */}
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex flex-wrap gap-1.5">
                      {(Object.keys(sdkSnippets) as Array<keyof typeof sdkSnippets>).map((key) => (
                        <Button
                          key={key}
                          size="sm"
                          variant={selectedSdk === key ? "default" : "outline"}
                          onClick={() => setSelectedSdk(key)}
                          className={`text-xs h-7 font-mono ${
                            selectedSdk === key
                              ? "bg-accent text-primary font-bold"
                              : "border-slate-800 text-gray-400 hover:text-white"
                          }`}
                        >
                          {sdkSnippets[key].title}
                        </Button>
                      ))}
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={handleCopyCode}
                      className="text-xs h-7 text-accent hover:text-white font-mono"
                    >
                      {copied ? <Check className="h-3.5 w-3.5 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                      {copied ? "Copied" : "Copy Code"}
                    </Button>
                  </div>

                  {/* Code Container */}
                  <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden font-mono text-xs shadow-inner">
                    <div className="bg-slate-950 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-gray-400 text-[11px]">
                      <span>{sdkSnippets[selectedSdk].filename}</span>
                      <span className="text-accent">{sdkSnippets[selectedSdk].title}</span>
                    </div>
                    <pre className="p-4 text-slate-200 overflow-x-auto leading-relaxed text-[11px] max-h-96">
                      <code>{sdkSnippets[selectedSdk].snippet}</code>
                    </pre>
                  </div>

                  <div className="p-3.5 bg-accent/5 border border-accent/15 rounded-lg text-xs text-gray-300 space-y-1">
                    <span className="font-semibold text-accent font-mono block">Why getOfferings() is fast:</span>
                    <p className="text-[11px] text-gray-400 leading-relaxed">
                      RevenueCat pre-fetches and caches offerings automatically at app launch, ensuring zero UI lag when presenting paywalls to visitors.
                    </p>
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>

            {/* Tab 4: Best Practices Table */}
            <TabsContent value="best_practices" className="flex-1 p-0 m-0 overflow-hidden">
              <ScrollArea className="h-[calc(100vh-275px)] px-6 py-4">
                <div className="space-y-4">
                  <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-2">
                    <h4 className="text-sm font-bold text-white font-mono flex items-center gap-2">
                      <Layers className="h-4 w-4 text-accent" />
                      RevenueCat Implementation Best Practices
                    </h4>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      Key architectural guidelines directly from the RevenueCat "Displaying Products" documentation:
                    </p>
                  </div>

                  <div className="grid gap-3">
                    <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-1.5">
                      <div className="text-emerald-400 font-bold text-xs flex items-center gap-1.5">
                        <CheckCircle2 className="h-4 w-4" /> DO: Drive paywalls dynamically from remote Offerings
                      </div>
                      <p className="text-[11px] text-gray-300 leading-relaxed">
                        Never hardcode strings, currency symbols, or fixed packages. Read all pricing and trial info directly from the package metadata.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-red-950/20 border border-red-500/30 space-y-1.5">
                      <div className="text-red-400 font-bold text-xs flex items-center gap-1.5">
                        <XCircle className="h-4 w-4" /> DON'T: Hardcode static StoreKit or Play Billing SKUs
                      </div>
                      <p className="text-[11px] text-gray-300 leading-relaxed">
                        Static SKUs force you to submit new app binaries every time you want to alter package configurations or prices.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-1.5">
                      <div className="text-emerald-400 font-bold text-xs flex items-center gap-1.5">
                        <CheckCircle2 className="h-4 w-4" /> DO: Use default package types ($rc_monthly, $rc_annual)
                      </div>
                      <p className="text-[11px] text-gray-300 leading-relaxed">
                        Default package identifiers allow effortless cross-platform abstraction between iOS, Android, and Web Stripe checkouts.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-red-950/20 border border-red-500/30 space-y-1.5">
                      <div className="text-red-400 font-bold text-xs flex items-center gap-1.5">
                        <XCircle className="h-4 w-4" /> DON'T: Hardcode free trial durations in UI copy
                      </div>
                      <p className="text-[11px] text-gray-300 leading-relaxed">
                        Read trial period metadata directly from the store product object so trial changes take effect automatically across all devices.
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>

          {/* Drawer Footer */}
          <SheetFooter className="p-4 border-t border-slate-800 bg-slate-900/90 sm:justify-between flex items-center gap-3">
            <div className="text-[11px] text-gray-400 font-mono hidden sm:block">
              Architecture Reference Demo • RevenueCat
            </div>
            <Button
              asChild
              className="bg-accent text-primary hover:bg-accent/90 transition-bounce font-mono text-xs w-full sm:w-auto font-semibold"
            >
              <a
                href="https://www.revenuecat.com/docs/getting-started/displaying-products"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read Official Docs <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
              </a>
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  )
}
