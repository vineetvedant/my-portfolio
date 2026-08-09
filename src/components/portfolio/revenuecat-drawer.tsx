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
  Sparkles,
  ExternalLink,
  Check,
  Copy,
  Zap,
  ShoppingBag,
  CreditCard,
  Code2,
  Layers,
  ArrowRight,
  ShieldCheck,
  Flame,
  Clock,
  CheckCircle2,
  XCircle,
  Smartphone,
  Globe,
  SlidersHorizontal,
  Target,
  RefreshCw
} from "lucide-react"

interface Package {
  id: string
  identifier: string
  type: string
  title: string
  priceString: string
  period: string
  badge?: string
  savings?: string
  trial?: string
  description: string
  features: string[]
}

interface OfferingCohort {
  id: string
  name: string
  placement: string
  tag: string
  description: string
  packages: Package[]
}

const cohortsData: Record<string, OfferingCohort> = {
  default: {
    id: "default",
    name: "Default Offering (Current)",
    placement: "main_paywall",
    tag: "Standard Audience",
    description: "Served remotely as default when no targeting rules or experiments match.",
    packages: [
      {
        id: "pkg_monthly",
        identifier: "$rc_monthly",
        type: "MONTHLY",
        title: "Monthly Pass",
        priceString: "$19.99",
        period: "per month",
        description: "Billed monthly via App Store / Google Play / Web Billing. Cancel anytime.",
        features: [
          "Full access to AI & automation pipelines",
          "Edge node monitoring (up to 5 devices)",
          "Standard API rate limits & webhooks",
          "Community & email support"
        ]
      },
      {
        id: "pkg_annual",
        identifier: "$rc_annual",
        type: "ANNUAL",
        title: "Annual Pro Pass",
        priceString: "$149.99",
        period: "per year ($12.49/mo)",
        badge: "Most Popular",
        savings: "Save 38%",
        trial: "7-Day Free Trial",
        description: "Billed annually. Remote price localization automatically applied.",
        features: [
          "Everything in Monthly Pass",
          "Unlimited edge nodes & YOLO inference streaming",
          "Custom RAG hallucination benchmark tools",
          "Priority SLA & 1-on-1 architecture review",
          "Early access to beta models & SDK updates"
        ]
      },
      {
        id: "pkg_lifetime",
        identifier: "$rc_lifetime",
        type: "LIFETIME",
        title: "Lifetime Access",
        priceString: "$399.00",
        period: "one-time payment",
        badge: "Founder Tier",
        savings: "Pay Once, Own Forever",
        description: "Perpetual non-consumable entitlement with zero recurring fees.",
        features: [
          "Perpetual lifetime entitlement ('pro_access')",
          "All future model releases & SDK toolkits",
          "Direct dev advisory & private repo access",
          "Full commercial deployment rights"
        ]
      }
    ]
  },
  paid_acquisition: {
    id: "paid_acquisition",
    name: "Paid Acquisition Cohort (ROAS Optimized)",
    placement: "ad_onboarding_placement",
    tag: "Paid Ad Install",
    description: "Custom Offering served to recover paid ad costs with bundled annual incentive.",
    packages: [
      {
        id: "pkg_ad_annual",
        identifier: "$rc_annual",
        type: "ANNUAL",
        title: "Starter Annual Bundle",
        priceString: "$119.99",
        period: "first year ($9.99/mo)",
        badge: "Welcome Deal",
        savings: "Save 50%",
        trial: "14-Day Free Trial",
        description: "Introductory promotional pricing configured in RevenueCat dashboard.",
        features: [
          "All Pro AI & Cloud Automation modules",
          "14-Day Risk-Free Trial",
          "Instant access to pre-trained YOLO models",
          "Dedicated fast-track onboarding"
        ]
      }
    ]
  },
  winback: {
    id: "winback",
    name: "Winback & Churn Offer (Retention)",
    placement: "settings_reactivation",
    tag: "Recently Churned",
    description: "Special winback Offering served to users who cancelled their previous subscription.",
    packages: [
      {
        id: "pkg_winback_monthly",
        identifier: "$rc_monthly",
        type: "MONTHLY",
        title: "Reactivation Monthly",
        priceString: "$9.99",
        period: "per month for 3 mos",
        badge: "Winback 50% Off",
        savings: "50% Discount",
        description: "Temporary discount to boost customer retention and lifetime value.",
        features: [
          "Restore all previous active entitlements",
          "3-month discounted rate before standard renewal",
          "Immediate resumption of cloud workloads"
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
  },
  flutter: {
    title: "Flutter",
    filename: "paywall_page.dart",
    snippet: `import 'package:purchases_flutter/purchases_flutter.dart';

Future<void> fetchOfferings() async {
  try {
    Offerings offerings = await Purchases.getOfferings();
    if (offerings.current != null && offerings.current!.availablePackages.isNotEmpty) {
      // Display packages
      List<Package> packages = offerings.current!.availablePackages;
      displayPaywall(packages);
    }
  } catch (e) {
    print("Failed to fetch offerings: $e");
  }
}

Future<void> makePurchase(Package packageToBuy) async {
  try {
    CustomerInfo customerInfo = await Purchases.purchasePackage(packageToBuy);
    if (customerInfo.entitlements.active.containsKey('pro_access')) {
      // Unlock entitlement
    }
  } catch (e) {
    // Handle error
  }
}`
  }
}

export function RevenueCatProductsDrawer() {
  const [open, setOpen] = useState(false)
  const [selectedCohortKey, setSelectedCohortKey] = useState<string>("default")
  const [selectedPackageId, setSelectedPackageId] = useState<string>("pkg_annual")
  const [selectedSdk, setSelectedSdk] = useState<keyof typeof sdkSnippets>("web")
  const [copied, setCopied] = useState(false)
  const [isPurchasing, setIsPurchasing] = useState(false)
  const { toast } = useToast()

  const currentCohort = cohortsData[selectedCohortKey] || cohortsData.default
  const activePackage = currentCohort.packages.find((p) => p.id === selectedPackageId) || currentCohort.packages[0]

  const handleCopyCode = () => {
    navigator.clipboard.writeText(sdkSnippets[selectedSdk].snippet)
    setCopied(true)
    toast({
      title: "Snippet Copied!",
      description: `${sdkSnippets[selectedSdk].filename} copied to clipboard.`
    })
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSimulatePurchase = () => {
    setIsPurchasing(true)
    setTimeout(() => {
      setIsPurchasing(false)
      toast({
        title: "🎉 Purchase Simulated via RevenueCat!",
        description: `Successfully granted 'pro_access' for ${activePackage.title} (${activePackage.priceString}).`
      })
    }, 850)
  }

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        {/* Floating Side Action Button (Docked on Right Screen Edge) */}
        <SheetTrigger asChild>
          <button
            aria-label="Open RevenueCat Products & Subscriptions Drawer"
            className="fixed right-0 top-1/2 -translate-y-1/2 z-40 group flex items-center bg-slate-900/95 hover:bg-slate-800 text-white pl-3.5 pr-2.5 py-3 rounded-l-2xl border-y border-l border-accent/40 shadow-[0_8px_30px_rgb(0,242,254,0.18)] hover:shadow-[0_8px_35px_rgb(0,242,254,0.35)] transition-all duration-300 backdrop-blur-md cursor-pointer"
          >
            <div className="flex flex-col items-center gap-1.5 mr-1.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent"></span>
              </span>
              <div className="p-1.5 rounded-lg bg-accent/15 text-accent group-hover:bg-accent group-hover:text-primary transition-smooth">
                <ShoppingBag className="h-4 w-4" />
              </div>
            </div>
            <div className="hidden sm:flex flex-col text-left font-mono">
              <span className="text-[10px] font-bold text-accent uppercase tracking-wider flex items-center gap-1">
                <Zap className="h-3 w-3 inline" /> RevenueCat
              </span>
              <span className="text-xs font-semibold text-white group-hover:text-accent transition-smooth">
                Displaying Products
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
          <div className="p-6 pb-4 border-b border-accent/15 bg-slate-900/60">
            <div className="flex items-center justify-between gap-3 mb-2 pr-8">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-red-500/20 via-orange-500/20 to-accent/20 border border-accent/30 text-accent flex-shrink-0">
                  <Flame className="h-6 w-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <SheetTitle className="text-lg sm:text-xl font-bold text-white font-mono flex items-center gap-2">
                      Displaying Products
                    </SheetTitle>
                    <Badge variant="outline" className="border-accent/30 text-accent text-[10px] font-mono bg-accent/10">
                      RevenueCat Guide
                    </Badge>
                  </div>
                  <SheetDescription className="text-xs text-gray-300 mt-1">
                    Build dynamic paywalls and control available products remotely without app updates
                  </SheetDescription>
                </div>
              </div>
            </div>

            {/* Official Doc Quick Banner */}
            <div className="flex items-center justify-between bg-accent/10 hover:bg-accent/15 border border-accent/25 rounded-lg px-3.5 py-2 transition-smooth mt-3">
              <span className="text-xs text-accent font-medium flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 flex-shrink-0" />
                Official RevenueCat Documentation
              </span>
              <a
                href="https://www.revenuecat.com/docs/getting-started/displaying-products"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-white hover:text-accent font-mono inline-flex items-center gap-1 underline underline-offset-2 transition-smooth"
              >
                Open Guide <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>

          {/* Drawer Body with Tabs */}
          <Tabs defaultValue="paywall" className="flex-1 flex flex-col overflow-hidden">
            <div className="px-6 pt-3 border-b border-slate-800 bg-slate-900/30">
              <TabsList className="grid grid-cols-4 bg-slate-900 border border-accent/15 w-full">
                <TabsTrigger value="paywall" className="text-xs font-mono data-[state=active]:bg-accent data-[state=active]:text-primary">
                  <CreditCard className="h-3.5 w-3.5 mr-1" /> Paywall
                </TabsTrigger>
                <TabsTrigger value="targeting" className="text-xs font-mono data-[state=active]:bg-accent data-[state=active]:text-primary">
                  <Target className="h-3.5 w-3.5 mr-1" /> Cohorts
                </TabsTrigger>
                <TabsTrigger value="code" className="text-xs font-mono data-[state=active]:bg-accent data-[state=active]:text-primary">
                  <Code2 className="h-3.5 w-3.5 mr-1" /> SDK Code
                </TabsTrigger>
                <TabsTrigger value="best_practices" className="text-xs font-mono data-[state=active]:bg-accent data-[state=active]:text-primary">
                  <Layers className="h-3.5 w-3.5 mr-1" /> Best Practices
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Tab 1: Interactive Paywall & Dynamic Offerings */}
            <TabsContent value="paywall" className="flex-1 p-0 m-0 overflow-hidden">
              <ScrollArea className="h-[calc(100vh-235px)] px-6 py-4">
                <div className="space-y-5">
                  {/* Remote Offering Status Bar */}
                  <div className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono uppercase text-accent font-semibold">Active Offering:</span>
                        <Badge variant="secondary" className="text-[10px] bg-accent/15 text-accent font-mono">
                          {currentCohort.placement}
                        </Badge>
                      </div>
                      <div className="text-xs font-bold text-white mt-0.5">{currentCohort.name}</div>
                      <div className="text-[11px] text-gray-400 mt-0.5">{currentCohort.description}</div>
                    </div>
                  </div>

                  {/* Product Package Cards */}
                  <div className="space-y-3">
                    {currentCohort.packages.map((pkg) => {
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
                                    Type: {pkg.type}
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

                  {/* Selected Package Features Checklist */}
                  <Card className="bg-slate-900/80 border-accent/15 p-4">
                    <h5 className="text-xs font-bold text-accent font-mono uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5" /> Features in {activePackage.title}:
                    </h5>
                    <ul className="space-y-2 text-xs text-gray-300">
                      {activePackage.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="h-3.5 w-3.5 text-accent mt-0.5 flex-shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>

                  {/* Simulated Purchase Button */}
                  <div className="space-y-2">
                    <Button
                      onClick={handleSimulatePurchase}
                      disabled={isPurchasing}
                      className="w-full bg-gradient-to-r from-accent via-cyan-400 to-accent text-primary font-bold hover:opacity-95 transition-bounce py-6 text-sm sm:text-base font-mono shadow-[0_4px_20px_rgba(0,242,254,0.25)]"
                    >
                      {isPurchasing ? (
                        <span className="flex items-center gap-2">
                          <span className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
                          Purchasing via RevenueCat...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <CreditCard className="h-5 w-5" />
                          Simulate Purchase ({activePackage.priceString})
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      )}
                    </Button>
                    <p className="text-[11px] text-center text-gray-400">
                      RevenueCat automatically handles Apple StoreKit, Google Play Billing & Stripe transactions.
                    </p>
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>

            {/* Tab 2: Cohorts & Placement Targeting */}
            <TabsContent value="targeting" className="flex-1 p-0 m-0 overflow-hidden">
              <ScrollArea className="h-[calc(100vh-235px)] px-6 py-4">
                <div className="space-y-4">
                  <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-2">
                    <h4 className="text-sm font-bold text-white font-mono flex items-center gap-2">
                      <SlidersHorizontal className="h-4 w-4 text-accent" />
                      Audience & Placement Simulation
                    </h4>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      RevenueCat lets you serve different Offerings dynamically to different cohorts (e.g. paid ads, long-term users, or churned users) without releasing app updates.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {Object.values(cohortsData).map((cohort) => {
                      const isSelected = selectedCohortKey === cohort.id
                      return (
                        <div
                          key={cohort.id}
                          onClick={() => {
                            setSelectedCohortKey(cohort.id)
                            setSelectedPackageId(cohort.packages[0].id)
                          }}
                          className={`p-4 rounded-xl border cursor-pointer transition-all ${
                            isSelected
                              ? "bg-accent/10 border-accent ring-1 ring-accent"
                              : "bg-slate-900/60 border-slate-800 hover:border-slate-700"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="font-bold text-white text-sm font-mono">{cohort.name}</span>
                            <Badge className="bg-accent/15 text-accent border-accent/30 text-[10px] font-mono">
                              {cohort.tag}
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-400">{cohort.description}</p>
                          <div className="mt-2.5 flex items-center gap-2 text-[11px] font-mono text-gray-300">
                            <span className="text-accent">Placement:</span> <code>{cohort.placement}</code> • {cohort.packages.length} product(s)
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  <div className="p-4 bg-slate-900 border border-accent/20 rounded-xl space-y-2 text-xs text-gray-300">
                    <div className="font-bold text-accent font-mono flex items-center gap-1.5">
                      <Target className="h-3.5 w-3.5" /> What is Placements API?
                    </div>
                    <p className="text-[11px] leading-relaxed text-gray-400">
                      Use <code className="text-accent">getCurrentOffering(forPlacement: "placement-id")</code> to serve unique paywalls across your onboarding flow, settings screen, or paywall triggers.
                    </p>
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>

            {/* Tab 3: Multi-Language SDK Snippets */}
            <TabsContent value="code" className="flex-1 p-0 m-0 overflow-hidden">
              <ScrollArea className="h-[calc(100vh-235px)] px-6 py-4">
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

                  {/* Guidance Note */}
                  <div className="p-3.5 bg-accent/5 border border-accent/15 rounded-lg text-xs text-gray-300 space-y-1.5">
                    <span className="font-semibold text-accent font-mono block">Fetching Offerings Lifecycle:</span>
                    <p className="text-[11px] text-gray-400 leading-relaxed">
                      • The SDK pre-fetches offerings in the background on app launch, meaning <code className="text-accent">getOfferings()</code> resolves almost instantly from cache without extra network latency.
                    </p>
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>

            {/* Tab 4: Best Practices (Do's & Don'ts) */}
            <TabsContent value="best_practices" className="flex-1 p-0 m-0 overflow-hidden">
              <ScrollArea className="h-[calc(100vh-235px)] px-6 py-4">
                <div className="space-y-4">
                  <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-2">
                    <h4 className="text-sm font-bold text-white font-mono flex items-center gap-2">
                      <Layers className="h-4 w-4 text-accent" />
                      RevenueCat Best Practices Table
                    </h4>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      Recommendations directly from RevenueCat engineering for production subscription apps:
                    </p>
                  </div>

                  <div className="grid gap-3">
                    <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-1.5">
                      <div className="text-emerald-400 font-bold text-xs flex items-center gap-1.5">
                        <CheckCircle2 className="h-4 w-4" /> DO: Keep paywalls completely dynamic
                      </div>
                      <p className="text-[11px] text-gray-300 leading-relaxed">
                        Minimize or eliminate any hardcoded price strings, currency symbols, or product IDs. Let RevenueCat's remote Offering drive the UI.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-red-950/20 border border-red-500/30 space-y-1.5">
                      <div className="text-red-400 font-bold text-xs flex items-center gap-1.5">
                        <XCircle className="h-4 w-4" /> DON'T: Hardcode static product IDs in app binaries
                      </div>
                      <p className="text-[11px] text-gray-300 leading-relaxed">
                        Hardcoding product IDs requires a new App Store / Play Store release every time you want to test new prices or package tiers.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-1.5">
                      <div className="text-emerald-400 font-bold text-xs flex items-center gap-1.5">
                        <CheckCircle2 className="h-4 w-4" /> DO: Use default package types ($rc_monthly, $rc_annual)
                      </div>
                      <p className="text-[11px] text-gray-300 leading-relaxed">
                        Standard package identifiers enable seamless cross-platform mapping between iOS StoreKit, Google Play Billing, and Web Stripe products.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-red-950/20 border border-red-500/30 space-y-1.5">
                      <div className="text-red-400 font-bold text-xs flex items-center gap-1.5">
                        <XCircle className="h-4 w-4" /> DON'T: Hardcode free trial durations
                      </div>
                      <p className="text-[11px] text-gray-300 leading-relaxed">
                        Read trial period metadata directly from the store product object so trial changes take effect automatically.
                      </p>
                    </div>
                  </div>

                  {/* Hierarchy Reference */}
                  <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2 font-mono text-xs">
                    <span className="text-accent font-bold block">Package Types Supported:</span>
                    <div className="flex flex-wrap gap-1.5 text-[10px]">
                      {["MONTHLY", "ANNUAL", "LIFETIME", "SIX_MONTH", "THREE_MONTH", "TWO_MONTH", "WEEKLY", "CUSTOM"].map((t) => (
                        <Badge key={t} variant="outline" className="border-slate-700 bg-slate-950 text-gray-300">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>

          {/* Drawer Footer */}
          <SheetFooter className="p-4 border-t border-slate-800 bg-slate-900/80 sm:justify-between flex items-center gap-3">
            <div className="text-[11px] text-gray-400 font-mono hidden sm:block">
              RevenueCat Documentation • Displaying Products
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
