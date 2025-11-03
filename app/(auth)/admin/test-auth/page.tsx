// "use client";

// import { refreshAccessToken } from "@/lib/auth/callbacks";
// import { useSession } from "next-auth/react";
// import { useState, useEffect } from "react";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/UI/card";
// import { Button } from "@/components/UI/button";
// import { Badge } from "@/components/UI/badge";
// import { jwtDecode } from "jwt-decode";
// import { RefreshCw, Copy, CheckCircle2, XCircle, Clock, User, Key } from "lucide-react";
// import { toast } from "@/components/UI/toast";

// interface DecodedToken {
//   exp?: number;
//   iat?: number;
//   sub?: string;
//   [key: string]: unknown;
// }

// interface RefreshResult {
//   accessToken?: string;
//   refreshToken?: string;
//   error?: string;
//   [key: string]: unknown;
// }

// export default function TestAuthPage() {
//   const { data: session, update } = useSession();
//   const user = session?.user;
//   const [loading, setLoading] = useState(false);
//   const [refreshResult, setRefreshResult] = useState<RefreshResult | null>(null);
//   const [tokenInfo, setTokenInfo] = useState<DecodedToken | null>(null);
//   const [timeUntilExpiry, setTimeUntilExpiry] = useState<string>("");

//   // Decode token and calculate expiry time
//   useEffect(() => {
//     if (user?.accessToken) {
//       try {
//         const decoded = jwtDecode<DecodedToken>(user.accessToken);
//         setTokenInfo(decoded);
//       } catch (error) {
//         console.error("Failed to decode token:", error);
//       }
//     }
//   }, [user?.accessToken]);

//   // Update time until expiry every second
//   useEffect(() => {
//     if (!tokenInfo?.exp) return;

//     const updateTimer = () => {
//       const now = Date.now();
//       const expiryTime = tokenInfo.exp! * 1000;
//       const timeLeft = expiryTime - now;

//       if (timeLeft <= 0) {
//         setTimeUntilExpiry("Expired");
//       } else {
//         const hours = Math.floor(timeLeft / (1000 * 60 * 60));
//         const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
//         const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
//         setTimeUntilExpiry(`${hours}h ${minutes}m ${seconds}s`);
//       }
//     };

//     updateTimer();
//     const interval = setInterval(updateTimer, 1000);
//     return () => clearInterval(interval);
//   }, [tokenInfo]);

//   const handleRefreshToken = async () => {
//     if (!user?.refreshToken) {
//       toast.error("No refresh token found");
//       return;
//     }

//     setLoading(true);
//     setRefreshResult(null);

//     try {
//       // Call the refresh function with the full session data structure
//       const refreshedData = await refreshAccessToken({
//         accessToken: user.accessToken,
//         refreshToken: user.refreshToken,
//         ...session,
//       });

//       setRefreshResult(refreshedData);

//       // Check if refresh was successful
//       if (refreshedData.error) {
//         toast.error("Token Refresh Failed", {
//           description: refreshedData.error,
//         });
//       } else {
//         // Update the session with new tokens
//         await update({
//           ...session,
//           user: {
//             ...user,
//             accessToken: refreshedData.accessToken,
//             refreshToken: refreshedData.refreshToken || user.refreshToken,
//           },
//         });

//         toast.success("Token Refreshed Successfully", {
//           description: "Your session has been extended",
//         });
//       }
//     } catch (error) {
//       console.error("Refresh token error:", error);
//       setRefreshResult({ error: String(error) });
//       toast.error("Token Refresh Failed", {
//         description: String(error),
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const copyToClipboard = (text: string, label: string) => {
//     navigator.clipboard.writeText(text);
//     toast.success(`${label} copied to clipboard`);
//   };

//   const formatDate = (timestamp: number) => {
//     return new Date(timestamp * 1000).toLocaleString();
//   };

//   const isTokenExpired = tokenInfo?.exp ? Date.now() >= tokenInfo.exp * 1000 : false;

//   return (
//     <div className="container mx-auto p-6 space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold">Authentication Test Page</h1>
//           <p className="text-gray-600">Test and monitor your authentication tokens</p>
//         </div>
//         <Badge variant={isTokenExpired ? "destructive" : "default"} className="text-sm">
//           {isTokenExpired ? "Token Expired" : "Token Valid"}
//         </Badge>
//       </div>

//       {/* User Info Card */}
//       <Card>
//         <CardHeader>
//           <div className="flex items-center gap-2">
//             <User className="h-5 w-5" />
//             <CardTitle>User Information</CardTitle>
//           </div>
//           <CardDescription>Current authenticated user details</CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-3">
//           <div className="grid gap-2">
//             <div className="flex items-center justify-between">
//               <span className="font-medium text-gray-600">Email:</span>
//               <span className="font-mono">{user?.email || "Not available"}</span>
//             </div>
//             <div className="flex items-center justify-between">
//               <span className="font-medium text-gray-600">Name:</span>
//               <span className="font-mono">
//                 {user?.firstName} {user?.lastName}
//               </span>
//             </div>
//             <div className="flex items-center justify-between">
//               <span className="font-medium text-gray-600">Type:</span>
//               <Badge>{user?.type || "Unknown"}</Badge>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Token Status Card */}
//       <Card>
//         <CardHeader>
//           <div className="flex items-center gap-2">
//             <Clock className="h-5 w-5" />
//             <CardTitle>Token Status</CardTitle>
//           </div>
//           <CardDescription>Access token expiration information</CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           {tokenInfo ? (
//             <div className="space-y-3">
//               <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
//                 <span className="font-medium text-gray-600">Time Until Expiry:</span>
//                 <span className={`font-mono text-lg font-bold ${isTokenExpired ? "text-red-600" : "text-green-600"}`}>
//                   {timeUntilExpiry}
//                 </span>
//               </div>
//               <div className="grid gap-2">
//                 <div className="flex items-center justify-between">
//                   <span className="font-medium text-gray-600">Issued At:</span>
//                   <span className="text-sm font-mono">
//                     {tokenInfo.iat ? formatDate(tokenInfo.iat) : "N/A"}
//                   </span>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <span className="font-medium text-gray-600">Expires At:</span>
//                   <span className="text-sm font-mono">
//                     {tokenInfo.exp ? formatDate(tokenInfo.exp) : "N/A"}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <p className="text-gray-500">No token information available</p>
//           )}
//         </CardContent>
//       </Card>

//       {/* Tokens Card */}
//       <Card>
//         <CardHeader>
//           <div className="flex items-center gap-2">
//             <Key className="h-5 w-5" />
//             <CardTitle>Access & Refresh Tokens</CardTitle>
//           </div>
//           <CardDescription>Your current authentication tokens</CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           {/* Access Token */}
//           <div>
//             <div className="flex items-center justify-between mb-2">
//               <span className="font-medium text-gray-700">Access Token</span>
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={() => copyToClipboard(user?.accessToken || "", "Access Token")}
//                 disabled={!user?.accessToken}
//               >
//                 <Copy className="h-4 w-4" />
//               </Button>
//             </div>
//             <div className="p-3 bg-gray-50 rounded border border-gray-200 font-mono text-xs break-all">
//               {user?.accessToken ? (
//                 <span className="text-gray-600">{user.accessToken.substring(0, 100)}...</span>
//               ) : (
//                 <span className="text-gray-400">No access token</span>
//               )}
//             </div>
//           </div>

//           {/* Refresh Token */}
//           <div>
//             <div className="flex items-center justify-between mb-2">
//               <span className="font-medium text-gray-700">Refresh Token</span>
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={() => copyToClipboard(user?.refreshToken || "", "Refresh Token")}
//                 disabled={!user?.refreshToken}
//               >
//                 <Copy className="h-4 w-4" />
//               </Button>
//             </div>
//             <div className="p-3 bg-gray-50 rounded border border-gray-200 font-mono text-xs break-all">
//               {user?.refreshToken ? (
//                 <span className="text-gray-600">{user.refreshToken.substring(0, 100)}...</span>
//               ) : (
//                 <span className="text-gray-400">No refresh token</span>
//               )}
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Refresh Action Card */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Test Token Refresh</CardTitle>
//           <CardDescription>
//             Manually trigger a token refresh to test the authentication flow
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <Button
//             onClick={handleRefreshToken}
//             disabled={loading || !user?.refreshToken}
//             className="w-full"
//             size="lg"
//           >
//             {loading ? (
//               <>
//                 <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
//                 Refreshing...
//               </>
//             ) : (
//               <>
//                 <RefreshCw className="mr-2 h-5 w-5" />
//                 Refresh Access Token
//               </>
//             )}
//           </Button>

//           {/* Refresh Result */}
//           {refreshResult && (
//             <div className="mt-4">
//               <div className="flex items-center gap-2 mb-2">
//                 {refreshResult.error ? (
//                   <>
//                     <XCircle className="h-5 w-5 text-red-600" />
//                     <span className="font-medium text-red-600">Refresh Failed</span>
//                   </>
//                 ) : (
//                   <>
//                     <CheckCircle2 className="h-5 w-5 text-green-600" />
//                     <span className="font-medium text-green-600">Refresh Successful</span>
//                   </>
//                 )}
//               </div>
//               <div className="p-4 bg-gray-50 rounded border border-gray-200">
//                 <pre className="text-xs overflow-auto">
//                   {JSON.stringify(refreshResult, null, 2)}
//                 </pre>
//               </div>
//             </div>
//           )}
//         </CardContent>
//       </Card>

//       {/* Session Error Display */}
//       {session?.error && (
//         <Card className="border-red-200 bg-red-50">
//           <CardHeader>
//             <div className="flex items-center gap-2">
//               <XCircle className="h-5 w-5 text-red-600" />
//               <CardTitle className="text-red-600">Session Error</CardTitle>
//             </div>
//           </CardHeader>
//           <CardContent>
//             <p className="text-red-600">{session.error}</p>
//             <p className="text-sm text-gray-600 mt-2">
//               You may need to sign out and sign in again to restore your session.
//             </p>
//           </CardContent>
//         </Card>
//       )}
//     </div>
//   );
// }

export default function TestAuthPage() {
  return <div>Test Auth Page</div>;
}