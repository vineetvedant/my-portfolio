import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import GlassSurface from "@/components/ui/GlassSurface"
import { 
  Briefcase, 
  Cpu, 
  Copy, 
  Check, 
  Terminal, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  CheckCircle,
  Database,
  Code
} from "lucide-react"

export function TargetPitchSection() {
  const [activeTab, setActiveTab] = useState<"recruiter" | "developer">("recruiter")
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const recruiterPitch = `Vedant Singh is a Computer Science Engineer specializing in AI, automation, and cloud infrastructure. He has delivered major efficiency gains, including a 60% regression cycle reduction at Wipro, a 37% HPC efficiency boost, and a 40% deployment rollout acceleration using Terraform. Disciplined (NCC 'C' certified) and highly collaborative. Reach him at singhvineetvedant@gmail.com.`

  const handleCopyPitch = () => {
    navigator.clipboard.writeText(recruiterPitch)
    setCopied(true)
    toast({
      title: "Pitch Copied!",
      description: "Recruiter elevator pitch has been copied to your clipboard.",
    })
    setTimeout(() => setCopied(false), 3000)
  }

  return (
    <section id="pitch" className="py-20 bg-section-alt relative overflow-hidden">
      {/* Decorative gradient blur */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <GlassSurface width="100%" height="auto" borderRadius={16} brightness={25} opacity={0.8} backgroundOpacity={0.12} className="theme-glass-header mb-12">
        <div className="text-center px-6 py-7">
          <Badge className="mb-4 bg-accent/10 text-accent border-accent/20 hover:bg-accent/20">
            Tailored Fit
          </Badge>
          <h2 className="text-4xl font-bold text-primary mb-4">Quick Pitch</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose who you are to see the metrics, achievements, and capabilities that matter most to you.
          </p>
        </div>
        </GlassSurface>

        {/* Tab Selectors */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 bg-background border border-accent/20 rounded-xl shadow-md">
            <button
              onClick={() => setActiveTab("recruiter")}
              className={`flex items-center px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-300 ${
                activeTab === "recruiter"
                  ? "bg-accent text-primary shadow-sm"
                  : "text-muted-foreground hover:text-primary hover:bg-muted/50"
              }`}
            >
              <Briefcase className="h-4 w-4 mr-2" />
              For HR & Recruiters
            </button>
            <button
              onClick={() => setActiveTab("developer")}
              className={`flex items-center px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-300 ${
                activeTab === "developer"
                  ? "bg-accent text-primary shadow-sm"
                  : "text-muted-foreground hover:text-primary hover:bg-muted/50"
              }`}
            >
              <Cpu className="h-4 w-4 mr-2" />
              For Developers & Tech Leads
            </button>
          </div>
        </div>

        {/* Recruiter Persona Panel */}
        {activeTab === "recruiter" && (
          <div className="animate-fade-in grid lg:grid-cols-12 gap-8 items-start">
            {/* Left stats panel */}
            <div className="lg:col-span-7 space-y-6">
              <h3 className="text-2xl font-bold text-primary flex items-center">
                <Sparkles className="h-5 w-5 text-accent mr-2" />
                The Recruiter Magnet: Why Hire Me?
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                I help companies streamline operations and build reliable backend automated frameworks. 
                I focus on measurable business value, cutting release times, and automating manual processes.
              </p>

              {/* Recruiter Metric Cards */}
              <div className="grid sm:grid-cols-2 gap-4">
                <Card className="p-5 border-l-4 border-l-accent border-accent/10 bg-background/50 hover:bg-background transition-all duration-300">
                  <div className="text-3xl font-extrabold text-accent mb-1">60%</div>
                  <div className="text-sm font-semibold text-primary mb-1">Regression Cycle Reduction</div>
                  <p className="text-xs text-muted-foreground">
                    Automated 500+ test cases across 5 core microservices at Wipro.
                  </p>
                </Card>
                <Card className="p-5 border-l-4 border-l-accent border-accent/10 bg-background/50 hover:bg-background transition-all duration-300">
                  <div className="text-3xl font-extrabold text-accent mb-1">40%</div>
                  <div className="text-sm font-semibold text-primary mb-1">Faster Cloud Rollout</div>
                  <p className="text-xs text-muted-foreground">
                    Cut Siemens Energy cloud deployments from 5 days to 3 days using Terraform.
                  </p>
                </Card>
                <Card className="p-5 border-l-4 border-l-accent border-accent/10 bg-background/50 hover:bg-background transition-all duration-300">
                  <div className="text-3xl font-extrabold text-accent mb-1">37%</div>
                  <div className="text-sm font-semibold text-primary mb-1">HPC Resource Optimization</div>
                  <p className="text-xs text-muted-foreground">
                    Boosted scheduling efficiency at Altair for large workloads.
                  </p>
                </Card>
                <Card className="p-5 border-l-4 border-l-accent border-accent/10 bg-background/50 hover:bg-background transition-all duration-300">
                  <div className="text-3xl font-extrabold text-accent mb-1">80%</div>
                  <div className="text-sm font-semibold text-primary mb-1">Incident Reduction</div>
                  <p className="text-xs text-muted-foreground">
                    Deployed AI surveillance models to secure restricted zones at Proeffico.
                  </p>
                </Card>
              </div>

              {/* Core recuitment benefits */}
              <div className="space-y-3">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-accent mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">
                    <strong className="text-primary">Discipline & Leadership:</strong> NCC 'C' certificate holder, indicating high accountability, structure, and team coordination.
                  </span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-accent mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">
                    <strong className="text-primary">Adaptability:</strong> Rapid onboarding, with internships and roles spanning Wipro, Siemens Energy, and Altair.
                  </span>
                </div>
              </div>
            </div>

            {/* Right Quick Share Card */}
            <div className="lg:col-span-5">
              <Card className="border-accent/30 bg-primary/5 shadow-xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 opacity-5">
                  <Briefcase className="h-40 w-40" />
                </div>
                <h4 className="text-lg font-bold text-primary mb-4 flex items-center">
                  <ShieldCheck className="h-5 w-5 text-accent mr-2" />
                  One-Click Recruiter Pitch
                </h4>
                <p className="text-xs text-muted-foreground mb-4">
                  Copy this optimized summary to share directly with your hiring managers or engineering leads:
                </p>
                
                <div className="bg-background border border-accent/10 rounded-lg p-4 mb-6 relative group">
                  <p className="text-xs leading-relaxed text-muted-foreground select-all">
                    {recruiterPitch}
                  </p>
                </div>

                <Button 
                  onClick={handleCopyPitch}
                  className="w-full bg-accent text-primary hover:bg-accent/90 transition-bounce font-semibold"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Pitch Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Elevator Pitch
                    </>
                  )}
                </Button>
              </Card>
            </div>
          </div>
        )}

        {/* Developer Persona Panel */}
        {activeTab === "developer" && (
          <div className="animate-fade-in grid lg:grid-cols-12 gap-8 items-start">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <h3 className="text-2xl font-bold text-primary flex items-center">
                <Terminal className="h-5 w-5 text-accent mr-2" />
                The Dev Magnet: Code & Performance Focus
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                I write optimized Python, C++, and Terraform configurations, prioritizing latency reduction, concurrency, and high-performance computing constraints.
              </p>

              {/* Tech Spec Grid */}
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="p-2 bg-accent/10 rounded-lg mr-4 mt-1">
                    <Database className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary">RAG Hallucination Tuning</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Engineered a custom RAG pipeline mapping 10k+ queries. Achieved a 30% hallucination reduction.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="p-2 bg-accent/10 rounded-lg mr-4 mt-1">
                    <Code className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary">Edge Surveillance Clusters</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Maintained C++/Python edge health nodes on 30+ Raspberry Pis running YOLOv8 tracking with 99% uptime.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="p-2 bg-accent/10 rounded-lg mr-4 mt-1">
                    <Zap className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary">Terraform IaC & Parallel Testing</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Provisioned parallel, cross-platform environments (AWS/OCI) cutting testing duration by 30% and deployments by 40%.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Terminal Block */}
            <div className="lg:col-span-6">
              <Card className="bg-slate-950 text-slate-100 font-mono text-xs rounded-xl shadow-2xl overflow-hidden border border-slate-800">
                {/* Window header */}
                <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800">
                  <div className="flex items-center space-x-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-green-500 inline-block" />
                  </div>
                  <span className="text-slate-400 text-[10px]">vedant-singh@edge-node-30: ~</span>
                  <div className="w-12" />
                </div>
                {/* Terminal Body */}
                <CardContent className="p-5 space-y-4">
                  <div>
                    <span className="text-green-400">vedant-singh@edge-node-30:~$</span> <span className="text-slate-300">cat system_deploy_metrics.json</span>
                  </div>
                  <div className="text-slate-400 pl-4 space-y-1">
                    <div>{`{`}</div>
                    <div className="pl-4"><span className="text-amber-400">"infrastructure"</span>: <span className="text-cyan-400">"Multi-Cloud (AWS + OCI)"</span>,</div>
                    <div className="pl-4"><span className="text-amber-400">"provisioning"</span>: <span className="text-cyan-400">"Terraform"</span>,</div>
                    <div className="pl-4"><span className="text-amber-400">"edge_nodes"</span>: <span className="text-cyan-400">"30x Raspberry Pi"</span>,</div>
                    <div className="pl-4"><span className="text-amber-400">"inference_pipeline"</span>: <span className="text-cyan-400">"YOLOv8 + RTSP Streaming"</span>,</div>
                    <div className="pl-4"><span className="text-amber-400">"concurrency"</span>: <span className="text-cyan-400">"OpenMP + parallel python nodes"</span>,</div>
                    <div className="pl-4"><span className="text-amber-400">"rag_tuning"</span>: <span className="text-cyan-400">"Custom semantic search + Hallucination checks"</span>,</div>
                    <div className="pl-4"><span className="text-amber-400">"uptime_sla"</span>: <span className="text-cyan-400">"99.1%"</span>,</div>
                    <div className="pl-4"><span className="text-amber-400">"regression_reduction"</span>: <span className="text-cyan-400">"60%"</span></div>
                    <div>{`}`}</div>
                  </div>
                  <div>
                    <span className="text-green-400">vedant-singh@edge-node-30:~$</span> <span className="text-slate-300">make test-pipeline --verbose</span>
                  </div>
                  <div className="text-slate-500 pl-4 space-y-0.5">
                    <div>[INFO] Loading YOLOv8 model weights... Done.</div>
                    <div>[INFO] RTSP capture stream initiated on channel 0.</div>
                    <div>[SUCCESS] Object tracking speed: 42 FPS on edge hardware.</div>
                    <div>[SUCCESS] RAG checks complete. Hallucination rate: &lt; 2.5%</div>
                    <div>[SUCCESS] Pipeline checks completed. 0 warnings.</div>
                  </div>
                  <div className="animate-pulse">
                    <span className="text-green-400">vedant-singh@edge-node-30:~$</span> <span className="w-1.5 h-3 bg-slate-300 inline-block align-middle" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
