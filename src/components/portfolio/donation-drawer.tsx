import { useState, useEffect, useRef } from "react"
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
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/hooks/use-toast"
import {
  Heart,
  Coffee,
  Sparkles,
  Zap,
  Github,
  CreditCard,
  Check,
  ExternalLink,
  ShieldCheck,
  Gift,
  QrCode,
  Clock,
  Eye,
  EyeOff,
  Smartphone,
  Copy,
  Download,
  X,
  RefreshCw
} from "lucide-react"

interface DonationTier {
  id: string
  name: string
  amount: number
  inrAmount: number
  currencySymbol: string
  icon: React.ElementType
  popular?: boolean
  description: string
}

const donationTiers: DonationTier[] = [
  {
    id: "coffee",
    name: "Buy a Coffee",
    amount: 3,
    inrAmount: 250,
    currencySymbol: "$",
    icon: Coffee,
    description: "A small boost to keep the code flowing & models training."
  },
  {
    id: "gpu",
    name: "GPU & Server Fuel",
    amount: 10,
    inrAmount: 850,
    currencySymbol: "$",
    icon: Zap,
    popular: true,
    description: "Helps cover edge hardware, cloud compute & server testing costs."
  },
  {
    id: "sponsor",
    name: "Research Sponsor",
    amount: 25,
    inrAmount: 2000,
    currencySymbol: "$",
    icon: Sparkles,
    description: "Directly funds open-source AI projects, papers & accessibility tools."
  }
]

export function DonationDrawer() {
  const [open, setOpen] = useState(false)
  const [isPillDismissed, setIsPillDismissed] = useState(false)
  const [selectedTier, setSelectedTier] = useState<string>("gpu")
  const [customAmount, setCustomAmount] = useState<string>("")
  const [currency, setCurrency] = useState<"USD" | "INR">("USD")
  const [supporterName, setSupporterName] = useState<string>("")
  const [message, setMessage] = useState<string>("")
  const [copiedUpi, setCopiedUpi] = useState(false)
  const [showQrCode, setShowQrCode] = useState(false)
  const [autoDismissSecondsLeft, setAutoDismissSecondsLeft] = useState<number | null>(null)
  const [isUserInteracting, setIsUserInteracting] = useState(false)
  const { toast } = useToast()

  const popupTimerRef = useRef<NodeJS.Timeout | null>(null)
  const dismissIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const dismissTimerRef = useRef<NodeJS.Timeout | null>(null)

  const currentTier = donationTiers.find(t => t.id === selectedTier)
  
  // Calculate active amounts in USD and INR
  const activeAmountUSD = customAmount
    ? (currency === "USD" ? parseFloat(customAmount) || 0 : (parseFloat(customAmount) || 0) / 85)
    : (currentTier?.amount || 10)

  const activeAmountINR = customAmount
    ? (currency === "INR" ? Math.round(parseFloat(customAmount) || 0) : Math.round((parseFloat(customAmount) || 0) * 85))
    : (currentTier?.inrAmount || 850)

  // Direct donation/sponsor URLs & UPI Info
  const donationLinks = {
    buyMeACoffee: "https://buymeacoffee.com/vineetvedant",
    githubSponsors: "https://github.com/sponsors/vineetvedant",
    paypal: "https://paypal.me/vineetvedant",
    upiId: "singhv1000@upi",
    recipientName: "Vedant Singh"
  }

  // Dynamic Transaction Note for UPI
  const upiNote = supporterName ? `Sponsor by ${supporterName}` : "Portfolio Sponsor"

  // Generate dynamic custom UPI Payment URI with prefilled amount
  const dynamicUpiUri = activeAmountINR > 0
    ? `upi://pay?pa=${donationLinks.upiId}&pn=${encodeURIComponent(donationLinks.recipientName)}&am=${activeAmountINR}&cu=INR&tn=${encodeURIComponent(upiNote)}`
    : `upi://pay?pa=${donationLinks.upiId}&pn=${encodeURIComponent(donationLinks.recipientName)}&cu=INR`
  
  // Dynamic scannable QR Code image generated in real-time
  const dynamicQrImageUrl = activeAmountINR > 0
    ? `https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodeURIComponent(dynamicUpiUri)}&margin=6`
    : "/upi-qr.png"

  // Check if visitor previously dismissed the floating pill
  useEffect(() => {
    const isDismissed = sessionStorage.getItem("sponsor_pill_dismissed")
    if (isDismissed === "true") {
      setIsPillDismissed(true)
    }
  }, [])

  // 1. Auto popup after 90 seconds (1.5 min of viewing)
  useEffect(() => {
    const hasAutoPopped = sessionStorage.getItem("donation_auto_popped")
    if (!hasAutoPopped) {
      popupTimerRef.current = setTimeout(() => {
        setOpen(true)
        sessionStorage.setItem("donation_auto_popped", "true")
        setAutoDismissSecondsLeft(30)
      }, 90000) // 90 seconds
    }

    return () => {
      if (popupTimerRef.current) clearTimeout(popupTimerRef.current)
    }
  }, [])

  // 2. Auto dismiss after 30 seconds unless user is actively interacting
  useEffect(() => {
    if (open && autoDismissSecondsLeft !== null) {
      dismissIntervalRef.current = setInterval(() => {
        setAutoDismissSecondsLeft((prev) => {
          if (prev === null || isUserInteracting) return prev
          if (prev <= 1) {
            setOpen(false)
            return null
          }
          return prev - 1
        })
      }, 1000)
    } else {
      if (dismissIntervalRef.current) clearInterval(dismissIntervalRef.current)
      if (!open) {
        setAutoDismissSecondsLeft(null)
      }
    }

    return () => {
      if (dismissIntervalRef.current) clearInterval(dismissIntervalRef.current)
      if (dismissTimerRef.current) clearTimeout(dismissTimerRef.current)
    }
  }, [open, isUserInteracting, autoDismissSecondsLeft])

  const handleDismissPill = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsPillDismissed(true)
    sessionStorage.setItem("sponsor_pill_dismissed", "true")
    toast({
      title: "Badge Hidden",
      description: "You can still access support links in the page footer."
    })
  }

  const handleCopyUpi = () => {
    setIsUserInteracting(true)
    navigator.clipboard.writeText(donationLinks.upiId)
    setCopiedUpi(true)
    toast({
      title: "UPI ID Copied!",
      description: `${donationLinks.upiId} copied to clipboard.`
    })
    setTimeout(() => setCopiedUpi(false), 2000)
  }

  const handleToggleQr = () => {
    setIsUserInteracting(true)
    setShowQrCode(prev => !prev)
  }

  const handleProceedDonation = (platform: "bmc" | "github" | "paypal" | "custom") => {
    setIsUserInteracting(true)
    let targetUrl = donationLinks.buyMeACoffee
    if (platform === "github") targetUrl = donationLinks.githubSponsors
    if (platform === "paypal") targetUrl = donationLinks.paypal

    toast({
      title: "Thank you for your support! ❤️",
      description: `Redirecting to support with $${activeAmountUSD.toFixed(0)} (₹${activeAmountINR})...`
    })

    window.open(targetUrl, "_blank", "noopener,noreferrer")
  }

  const handleManualOpen = () => {
    setOpen(true)
    setIsUserInteracting(true)
    setAutoDismissSecondsLeft(null)
  }

  return (
    <>
      <Sheet open={open} onOpenChange={(val) => {
        setOpen(val)
        if (!val) setAutoDismissSecondsLeft(null)
      }}>
        {/* Floating Bottom-Right Pill (Mobile & Desktop Responsive) */}
        {!isPillDismissed && (
          <div className="fixed bottom-5 right-4 sm:bottom-7 sm:right-6 z-40 animate-in fade-in-50 slide-in-from-bottom-5 duration-300">
            <SheetTrigger asChild>
              <div
                role="button"
                tabIndex={0}
                onClick={handleManualOpen}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    handleManualOpen()
                  }
                }}
                aria-label="Support & Sponsor Vedant Singh"
                className="group relative flex items-center gap-2.5 sm:gap-3 bg-slate-950/90 hover:bg-slate-900 border border-pink-500/30 hover:border-pink-400 pl-3 pr-2.5 py-2 sm:pl-3.5 sm:pr-3 sm:py-2.5 rounded-full shadow-[0_8px_30px_rgba(236,72,153,0.25)] hover:shadow-[0_12px_35px_rgba(236,72,153,0.45)] backdrop-blur-xl transition-all duration-300 hover:scale-105 cursor-pointer ring-1 ring-white/10 select-none"
              >
                {/* Pulsing indicator & Heart Icon */}
                <div className="relative flex items-center justify-center">
                  <span className="relative flex h-2.5 w-2.5 absolute -top-0.5 -right-0.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-pink-500"></span>
                  </span>
                  <div className="p-1.5 rounded-full bg-pink-500/20 text-pink-400 group-hover:bg-pink-500 group-hover:text-white transition-smooth">
                    <Heart className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-current" />
                  </div>
                </div>

                {/* Text Labels */}
                <div className="flex flex-col text-left font-mono pr-1">
                  <span className="text-[9px] sm:text-[10px] font-bold text-pink-400 uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="h-2.5 w-2.5 inline" /> Sponsor
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-white group-hover:text-pink-300 transition-smooth leading-tight">
                    Support My Work
                  </span>
                </div>

                {/* Close 'X' Button to permanently hide floating pill */}
                <button
                  type="button"
                  onClick={handleDismissPill}
                  title="Hide sponsor button"
                  aria-label="Hide sponsor button"
                  className="p-1 rounded-full text-gray-400 hover:text-white hover:bg-slate-800 transition-smooth ml-0.5"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </SheetTrigger>
          </div>
        )}

        {/* Side Popup / Drawer Sheet */}
        <SheetContent
          side="right"
          className="w-full sm:max-w-xl md:max-w-lg bg-slate-950/95 border-l border-accent/20 text-white backdrop-blur-xl p-0 flex flex-col z-50 overflow-hidden"
          onPointerDown={() => setIsUserInteracting(true)}
        >
          {/* Auto-Dismiss Countdown Notification */}
          {autoDismissSecondsLeft !== null && autoDismissSecondsLeft > 0 && !isUserInteracting && (
            <div className="bg-pink-500/15 border-b border-pink-500/30 px-4 py-1.5 flex items-center justify-between text-[11px] text-pink-300 font-mono">
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 animate-pulse text-pink-400" />
                Auto-dismissing in {autoDismissSecondsLeft}s
              </span>
              <button
                onClick={() => setIsUserInteracting(true)}
                className="text-[10px] underline hover:text-white transition-smooth"
              >
                Keep Open
              </button>
            </div>
          )}

          {/* Drawer Header */}
          <div className="p-6 pb-4 border-b border-accent/15 bg-slate-900/70">
            <div className="flex items-center justify-between gap-3 mb-2 pr-8">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-pink-500/15 border border-pink-500/30 text-pink-400 flex-shrink-0">
                  <Heart className="h-6 w-6 fill-current" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <SheetTitle className="text-lg sm:text-xl font-bold text-white font-mono flex items-center gap-2">
                      Support My Work
                    </SheetTitle>
                    <Badge variant="outline" className="border-pink-500/30 text-pink-400 text-[10px] font-mono bg-pink-500/10">
                      Sponsor
                    </Badge>
                  </div>
                  <SheetDescription className="text-xs text-gray-300 mt-1">
                    Support open-source AI projects, research publications & accessibility tools
                  </SheetDescription>
                </div>
              </div>
            </div>
          </div>

          {/* Drawer Body */}
          <ScrollArea className="flex-1 px-6 py-5">
            <div className="space-y-5">
              {/* Preset Donation Tiers */}
              <div>
                <label className="text-xs font-bold text-accent font-mono uppercase tracking-wider block mb-2.5">
                  Select Support Amount:
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {donationTiers.map((tier) => {
                    const isSelected = selectedTier === tier.id && !customAmount
                    const TierIcon = tier.icon
                    return (
                      <div
                        key={tier.id}
                        onClick={() => {
                          setIsUserInteracting(true)
                          setSelectedTier(tier.id)
                          setCustomAmount("")
                        }}
                        className={`relative p-3 rounded-xl border text-center cursor-pointer transition-all duration-300 ${
                          isSelected
                            ? "bg-pink-500/15 border-pink-500 shadow-[0_0_20px_rgba(236,72,153,0.25)] ring-1 ring-pink-500"
                            : "bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900"
                        }`}
                      >
                        {tier.popular && (
                          <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                            <Badge className="bg-pink-500 text-white font-bold text-[9px] uppercase font-mono px-1.5 py-0 shadow-md">
                              Popular
                            </Badge>
                          </div>
                        )}
                        <TierIcon className={`h-5 w-5 mx-auto mb-1.5 ${isSelected ? "text-pink-400" : "text-gray-400"}`} />
                        <div className="text-lg font-black text-white font-mono">{tier.currencySymbol}{tier.amount}</div>
                        <div className="text-[10px] text-pink-400 font-mono font-semibold">₹{tier.inrAmount}</div>
                        <div className="text-[11px] font-semibold text-gray-300 mt-0.5 line-clamp-1">{tier.name}</div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Custom Amount Input with Currency Switcher */}
              <div className="bg-slate-900/70 p-3.5 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-gray-300 font-mono">
                    Custom Amount (Generates Real-time QR):
                  </label>
                  <div className="flex bg-slate-950 p-0.5 rounded-lg border border-slate-800">
                    <button
                      type="button"
                      onClick={() => setCurrency("USD")}
                      className={`px-2 py-0.5 text-[10px] font-mono rounded ${currency === "USD" ? "bg-accent text-primary font-bold" : "text-gray-400 hover:text-white"}`}
                    >
                      $ USD
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrency("INR")}
                      className={`px-2 py-0.5 text-[10px] font-mono rounded ${currency === "INR" ? "bg-accent text-primary font-bold" : "text-gray-400 hover:text-white"}`}
                    >
                      ₹ INR
                    </button>
                  </div>
                </div>

                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-mono text-sm">
                    {currency === "USD" ? "$" : "₹"}
                  </span>
                  <Input
                    type="number"
                    min="1"
                    placeholder={`Enter amount in ${currency} (e.g. ${currency === "USD" ? "20" : "1500"})`}
                    value={customAmount}
                    onFocus={() => setIsUserInteracting(true)}
                    onChange={(e) => {
                      setIsUserInteracting(true)
                      setCustomAmount(e.target.value)
                    }}
                    className="pl-7 bg-slate-950 border-slate-800 focus:border-pink-500 text-white font-mono text-sm"
                  />
                </div>

                {customAmount && (
                  <div className="text-[11px] text-accent font-mono pt-0.5 flex items-center justify-between">
                    <span>
                      Equivalent: {currency === "USD" ? `₹${activeAmountINR} INR` : `$${activeAmountUSD.toFixed(1)} USD`}
                    </span>
                    <span className="text-emerald-400 flex items-center gap-1">
                      <Zap className="h-3 w-3" /> Live QR Updated
                    </span>
                  </div>
                )}
              </div>

              {/* Tier Details Card */}
              <Card className="bg-slate-900/80 border-accent/15 p-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-accent font-mono mb-1">
                  <Gift className="h-4 w-4 text-pink-400" />
                  <span>Where does your support go?</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed mt-1">
                  {customAmount
                    ? `Your contribution of ${currency === "USD" ? `$${customAmount}` : `₹${customAmount}`} (₹${activeAmountINR}) directly supports open AI research, compute cluster costs, and accessibility tools.`
                    : currentTier?.description}
                </p>
              </Card>

              {/* UPI Card with Dynamic Amount QR Code */}
              <div className="p-4 bg-slate-900/90 rounded-xl border border-accent/25 shadow-lg space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-accent/15 text-accent">
                      <QrCode className="h-4 w-4" />
                    </div>
                    <span className="text-xs font-bold text-white font-mono uppercase tracking-wider">
                      Direct UPI Transfer
                    </span>
                  </div>
                  <Badge variant="outline" className="text-[10px] font-mono border-emerald-500/40 text-emerald-400 bg-emerald-500/10">
                    Auto-Prefills ₹{activeAmountINR}
                  </Badge>
                </div>

                {/* UPI ID Address Display */}
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex items-center justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] font-mono text-gray-400">UPI VPA:</div>
                    <div className="text-xs sm:text-sm font-bold text-accent font-mono truncate select-all">
                      {donationLinks.upiId}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-mono text-gray-400">Target Amount:</div>
                    <div className="text-xs sm:text-sm font-bold text-pink-400 font-mono">
                      ₹{activeAmountINR}
                    </div>
                  </div>
                </div>

                {/* Action Buttons Row */}
                <div className="grid grid-cols-2 gap-2 pt-0.5">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleCopyUpi}
                    className="w-full text-xs h-9 border-accent/30 text-accent hover:bg-accent hover:text-primary font-mono"
                  >
                    {copiedUpi ? <Check className="h-3.5 w-3.5 mr-1.5" /> : <Copy className="h-3.5 w-3.5 mr-1.5" />}
                    {copiedUpi ? "Copied!" : "Copy UPI ID"}
                  </Button>
                  <Button
                    size="sm"
                    variant={showQrCode ? "default" : "outline"}
                    onClick={handleToggleQr}
                    className={`w-full text-xs h-9 font-mono transition-smooth ${
                      showQrCode 
                        ? "bg-accent text-primary font-semibold" 
                        : "border-slate-700 bg-slate-950 text-gray-200 hover:border-accent hover:text-white"
                    }`}
                  >
                    {showQrCode ? <EyeOff className="h-3.5 w-3.5 mr-1.5" /> : <Eye className="h-3.5 w-3.5 mr-1.5" />}
                    {showQrCode ? "Hide QR" : `View QR (₹${activeAmountINR})`}
                  </Button>
                </div>

                {/* Expandable Real-Time QR Code Box */}
                {showQrCode && (
                  <div className="pt-3 border-t border-slate-800 animate-in fade-in-50 zoom-in-95 duration-200">
                    <div className="bg-slate-950 p-4 rounded-xl border border-accent/20 flex flex-col items-center text-center">
                      
                      {/* Dynamic Amount Banner */}
                      <div className="mb-3 px-3 py-1 bg-pink-500/15 border border-pink-500/30 rounded-full text-xs font-mono text-pink-300 flex items-center gap-1.5">
                        <Sparkles className="h-3.5 w-3.5 text-pink-400" />
                        <span>Pre-configured Amount: <strong>₹{activeAmountINR}</strong></span>
                      </div>

                      {/* Scannable Real-time QR */}
                      <div className="p-3 bg-white rounded-2xl shadow-xl mb-3 ring-4 ring-accent/20 relative group">
                        <img
                          src={dynamicQrImageUrl}
                          alt={`Custom UPI QR Code for ₹${activeAmountINR} to ${donationLinks.upiId}`}
                          className="w-48 h-48 sm:w-52 sm:h-52 object-contain rounded-lg transition-all duration-300"
                          loading="eager"
                        />
                      </div>

                      <div className="space-y-1 mb-3">
                        <div className="text-xs font-bold text-white font-mono flex items-center justify-center gap-1">
                          <Smartphone className="h-3.5 w-3.5 text-accent" /> Scan with Any UPI App
                        </div>
                        <p className="text-[11px] text-gray-400">
                          Automatically opens GPay / PhonePe / Paytm with <strong>₹{activeAmountINR}</strong> pre-filled!
                        </p>
                      </div>

                      {/* Direct UPI App Trigger Link for Mobile Viewers */}
                      <div className="grid grid-cols-2 gap-2 w-full">
                        <Button
                          asChild
                          size="sm"
                          className="bg-accent text-primary hover:bg-accent/90 text-xs font-mono font-semibold h-8"
                        >
                          <a href={dynamicUpiUri}>
                            <Smartphone className="h-3.5 w-3.5 mr-1.5" />
                            Pay ₹{activeAmountINR}
                          </a>
                        </Button>
                        <Button
                          asChild
                          variant="outline"
                          size="sm"
                          className="border-slate-700 text-gray-300 hover:text-white text-xs font-mono h-8"
                        >
                          <a href={dynamicQrImageUrl} target="_blank" rel="noopener noreferrer" download={`upi-qr-${activeAmountINR}.png`}>
                            <Download className="h-3.5 w-3.5 mr-1.5" />
                            Save QR
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Supporter Message (Optional) */}
              <div className="space-y-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                <label className="text-xs font-bold text-gray-200 font-mono uppercase tracking-wider block">
                  Leave a Note (Optional):
                </label>
                <Input
                  placeholder="Your Name or Handle (optional)"
                  value={supporterName}
                  onFocus={() => setIsUserInteracting(true)}
                  onChange={(e) => {
                    setIsUserInteracting(true)
                    setSupporterName(e.target.value)
                  }}
                  className="bg-slate-950 border-slate-800 text-white text-xs"
                />
                <Textarea
                  placeholder="Say something nice or mention a project you like..."
                  value={message}
                  onFocus={() => setIsUserInteracting(true)}
                  onChange={(e) => {
                    setIsUserInteracting(true)
                    setMessage(e.target.value)
                  }}
                  rows={2}
                  className="bg-slate-950 border-slate-800 text-white text-xs resize-none"
                />
              </div>

              {/* Direct Payment / Sponsor Options */}
              <div className="space-y-2.5 pt-1">
                <Button
                  onClick={() => handleProceedDonation("bmc")}
                  className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-bold py-5 text-sm font-mono shadow-md"
                >
                  <Coffee className="mr-2 h-4 w-4" />
                  Support via Buy Me a Coffee (${activeAmountUSD.toFixed(0)})
                  <ExternalLink className="ml-2 h-3.5 w-3.5" />
                </Button>

                <div className="grid grid-cols-2 gap-2">
                  <Button
                    onClick={() => handleProceedDonation("github")}
                    variant="outline"
                    className="border-slate-700 bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono py-4"
                  >
                    <Github className="mr-1.5 h-3.5 w-3.5" />
                    GitHub Sponsors
                  </Button>

                  <Button
                    onClick={() => handleProceedDonation("paypal")}
                    variant="outline"
                    className="border-slate-700 bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono py-4"
                  >
                    <CreditCard className="mr-1.5 h-3.5 w-3.5 text-blue-400" />
                    PayPal
                  </Button>
                </div>
              </div>
            </div>
          </ScrollArea>

          {/* Drawer Footer */}
          <SheetFooter className="p-4 border-t border-slate-800 bg-slate-900/90 flex items-center justify-between sm:justify-between">
            <div className="text-[11px] text-gray-400 font-mono flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> Secure direct support
            </div>
            <a
              href="mailto:singhvineetvedant@gmail.com"
              className="text-xs text-accent hover:underline font-mono"
            >
              Contact Vedant →
            </a>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  )
}
