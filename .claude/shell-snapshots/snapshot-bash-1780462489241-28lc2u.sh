# Snapshot file
# Unset all aliases to avoid conflicts with functions
unalias -a 2>/dev/null || true
shopt -s expand_aliases
# Check for rg availability
if ! (unalias rg 2>/dev/null; command -v rg) >/dev/null 2>&1; then
  function rg {
  local _cc_bin="${CLAUDE_CODE_EXECPATH:-}"
  [[ -x $_cc_bin ]] || _cc_bin=/c/Users/ASUS/.local/bin/claude.exe
  if [[ ! -x $_cc_bin ]]; then command rg "$@"; return; fi
  if [[ -n $ZSH_VERSION ]]; then
    ARGV0=rg "$_cc_bin" "$@"
  elif [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "cygwin" ]] || [[ "$OSTYPE" == "win32" ]]; then
    ARGV0=rg "$_cc_bin" "$@"
  elif [[ $BASHPID != $$ ]]; then
    exec -a rg "$_cc_bin" "$@"
  else
    (exec -a rg "$_cc_bin" "$@")
  fi
}
fi
export PATH='/c/Users/ASUS/bin:/mingw64/bin:/usr/local/bin:/usr/bin:/bin:/mingw64/bin:/usr/bin:/c/Users/ASUS/bin:/c/Program Files/NVIDIA GPU Computing Toolkit/CUDA/v13.2/bin/x64:/c/Program Files/NVIDIA GPU Computing Toolkit/CUDA/v13.2/bin:/d/竞赛/工具/VMware/bin:/c/Windows/system32:/c/Windows:/c/Windows/System32/Wbem:/c/Windows/System32/WindowsPowerShell/v1.0:/c/Windows/System32/OpenSSH:/c/Program Files (x86)/NVIDIA Corporation/PhysX/Common:/c/Program Files/dotnet:/c/Users/ASUS/AppData/Local/Microsoft/WindowsApps:/c/Program Files/NVIDIA Corporation/Nsight Compute 2026.1.0:/c/Program Files/RedHat/Podman:/c/Program Files/NVIDIA Corporation/NVIDIA App/NvDLISR:/cmd:/c/Program Files/Microsoft/jdk-21.0.8.9-hotspot/bin:/c/Users/ASUS/AppData/Local/Programs/Python/Python314:/c/Users/ASUS/AppData/Local/Programs/Python/Python314/Scripts:/e/Trae/bin:/d/竞赛/工具/Microsoft VS Code/bin:/c/Users/ASUS/AppData/Roaming/npm:/d/Downloads/nodejs:/c/Users/ASUS/AppData/Local/Python/bin:/c/Users/ASUS/.vscode/extensions/anthropic.claude-code-2.1.158-win32-x64/resources/native-binary:/usr/bin/vendor_perl:/usr/bin/core_perl'
