/**
 * Linux syscall quiz pools (expanded)
 * - 主に「Linux x86_64 の一般的な syscall 名」を中心に収録（新しめ/ニッチめも含む）
 * - 目的：クイズ用の語彙プール（厳密な網羅ではなく、"それっぽさ" と "実在" の両立を優先）
 *
 * NOTE:
 * - syscall はカーネル/アーキテクチャで差があります（このプールは現代的な Linux を想定）
 * - ダミーは「それっぽいが syscall ではない」英単語/疑似 syscall 風 snake_case を中心にしています
 */

export const syscalls = {
  /**
   * easy: 超頻出・短め・基礎寄り（学習/直感で当てやすい）
   */
  easy: [
    // file I/O
    "read",
    "write",
    "open",
    "close",
    "lseek",
    "stat",
    "fstat",
    "lstat",
    "access",
    "fcntl",
    "ioctl",
    "fsync",
    "fdatasync",
    "truncate",
    "ftruncate",
    "getdents",
    "getdents64",
    "dup",
    "dup2",
    "dup3",
    "pipe",
    "pipe2",

    // directories & paths
    "getcwd",
    "chdir",
    "fchdir",
    "mkdir",
    "rmdir",
    "rename",
    "link",
    "unlink",
    "symlink",
    "readlink",
    "chmod",
    "umask",

    // process basics
    "getpid",
    "getppid",
    "fork",
    "vfork",
    "clone",
    "execve",
    "exit",
    "exit_group",
    "wait4",
    "kill",

    // identity
    "getuid",
    "geteuid",
    "getgid",
    "getegid",

    // time
    "time",
    "gettimeofday",
    "clock_gettime",
    "nanosleep",
    "alarm",
    "pause",

    // misc
    "uname",
  ],

  /**
   * normal: 実務で触れやすいが、easy より「名前が紛らわしい/長い/概念が増える」層
   */
  normal: [
    // modern open/stat family
    "openat",
    "openat2",
    "close_range",
    "creat",
    "newfstatat",
    "statx",
    "faccessat",
    "faccessat2",

    // link/rename *at variants
    "mkdirat",
    "unlinkat",
    "renameat",
    "renameat2",
    "linkat",
    "symlinkat",
    "readlinkat",

    // ownership & mode
    "chown",
    "fchown",
    "fchownat",
    "fchmod",
    "fchmodat",

    // extended I/O
    "pread64",
    "pwrite64",
    "readv",
    "writev",
    "preadv",
    "pwritev",
    "preadv2",
    "pwritev2",
    "sendfile",
    "copy_file_range",

    // file allocation / advice
    "fallocate",
    "readahead",
    "fadvise64",
    "sync",
    "syncfs",
    "sync_file_range",

    // memory mapping & VM
    "brk",
    "mmap",
    "munmap",
    "mprotect",
    "madvise",
    "mremap",
    "msync",
    "mincore",
    "mlock",
    "munlock",
    "mlockall",
    "munlockall",
    "mlock2",

    // polling / multiplexing
    "poll",
    "ppoll",
    "select",
    "pselect6",
    "epoll_create",
    "epoll_create1",
    "epoll_ctl",
    "epoll_wait",
    "epoll_pwait",

    // timers / fd-based events
    "eventfd",
    "eventfd2",
    "timerfd_create",
    "timerfd_settime",
    "timerfd_gettime",
    "signalfd",
    "signalfd4",
    "inotify_init",
    "inotify_init1",
    "inotify_add_watch",
    "inotify_rm_watch",

    // signals (rt_*)
    "rt_sigaction",
    "rt_sigprocmask",
    "rt_sigsuspend",
    "rt_sigtimedwait",
    "sigaltstack",

    // networking
    "socket",
    "socketpair",
    "bind",
    "listen",
    "accept",
    "accept4",
    "connect",
    "shutdown",
    "getsockname",
    "getpeername",
    "setsockopt",
    "getsockopt",
    "sendto",
    "recvfrom",
    "sendmsg",
    "recvmsg",
    "sendmmsg",
    "recvmmsg",

    // IPC (SysV)
    "shmget",
    "shmat",
    "shmctl",
    "shmdt",
    "msgget",
    "msgsnd",
    "msgrcv",
    "msgctl",
    "semget",
    "semop",
    "semctl",

    // process & scheduling / limits
    "gettid",
    "getpgid",
    "setpgid",
    "getsid",
    "setsid",
    "sched_yield",
    "setrlimit",
    "getrlimit",
    "prlimit64",

    // credentials
    "setuid",
    "setgid",
    "setreuid",
    "setregid",
    "setresuid",
    "setresgid",
    "setfsuid",
    "setfsgid",
    "capget",
    "capset",

    // randomness
    "getrandom",

    // filesystem mount basics
    "mount",
    "umount2",

    // misc controls
    "prctl",
  ],

  /**
   * hard: 「長い/新しい/カーネル機能色が強い/セキュリティ・仮想化・低レイヤ寄り」層
   */
  hard: [
    // modern async I/O (io_uring)
    "io_uring_setup",
    "io_uring_enter",
    "io_uring_register",

    // eBPF / perf / tracing
    "bpf",
    "perf_event_open",

    // futex & rseq
    "futex",
    "rseq",

    // pidfd
    "pidfd_open",
    "pidfd_send_signal",
    "pidfd_getfd",

    // process VM access
    "process_vm_readv",
    "process_vm_writev",

    // clone variants / namespaces
    "clone3",
    "unshare",
    "setns",

    // seccomp / ptrace
    "seccomp",
    "ptrace",
    "kcmp",

    // memfd / userfaultfd / keys
    "memfd_create",
    "memfd_secret",
    "userfaultfd",
    "add_key",
    "request_key",
    "keyctl",

    // fanotify
    "fanotify_init",
    "fanotify_mark",

    // mount API (newer, more esoteric)
    "open_tree",
    "move_mount",
    "fsopen",
    "fsconfig",
    "fsmount",
    "fspick",
    "mount_setattr",
    "pivot_root",

    // file handles
    "name_to_handle_at",
    "open_by_handle_at",

    // NUMA / policy
    "mbind",
    "set_mempolicy",
    "get_mempolicy",
    "migrate_pages",
    "move_pages",

    // scheduling attributes / cpu
    "sched_setattr",
    "sched_getattr",
    "getcpu",

    // splice family
    "splice",
    "tee",
    "vmsplice",

    // modules / kernel loading
    "init_module",
    "finit_module",
    "delete_module",

    // reboot / kexec
    "reboot",
    "kexec_load",
    "kexec_file_load",

    // clocks / timers
    "clock_nanosleep",
    "timer_create",
    "timer_settime",
    "timer_gettime",
    "timer_delete",

    // landlock (sandboxing)
    "landlock_create_ruleset",
    "landlock_add_rule",
    "landlock_restrict_self",

    // misc "新しめ/渋め"
    "pkey_alloc",
    "pkey_free",
    "pkey_mprotect",
  ],
} as const;

/**
 * それっぽいダミー（実在しない syscall）
 * - 「英単語として覚えがある」「API/概念としては存在しそう」「snake_case ならなおそれっぽい」
 * - ただし実在 syscall と衝突しないよう、既存 syscall 名・近縁の正式名は避けています
 */
export const dummyOptions = {
  easy: [
    "create",
    "make",
    "start",
    "stop",
    "view",
    "show",
    "get",
    "set",
    "add",
    "remove",
    "move",
    "copy",
    "check",
    "test",
    "run",
    "execute",
    "save",
    "load",
    "init",
    "end",
    "begin",
    "finish",
    "touch",
    "touch_file",
    "open_file",
    "close_file",
    "read_file",
    "write_file",
    "delete_file",
    "list_dir",
    "change_dir",
    "make_dir",
    "remove_dir",
    "print",
    "log",
    "debug",
    "trace",
    "ping",
    "pong",
    "echo",
    "sleep_ms",
    "wait_child",
    "kill_process",
    "fork_process",
    "spawn",
    "join",
    "leave",
    "quit",
    "status",
    "info",
    "help",
    "version",
  ],

  normal: [
    "allocate",
    "deallocate",
    "reserve",
    "release",
    "acquire",
    "dispatch",
    "schedule",
    "preempt",
    "suspend",
    "resume",
    "transfer",
    "redirect",
    "validate",
    "verify",
    "authorize",
    "authenticate",
    "encrypt",
    "decrypt",
    "compress",
    "decompress",
    "serialize",
    "deserialize",
    "transform",
    "convert",
    "normalize",
    "sanitize",
    "marshal",
    "unmarshal",
    "encode",
    "decode",
    "checksum",
    "hash",
    "sign",
    "verify_signature",
    "handshake",
    "negotiate",
    "reconnect",
    "disconnect",
    "send_packet",
    "receive_packet",
    "accept_conn",
    "connect_to",
    "bind_to",
    "listen_on",
    "mount_fs",
    "unmount_fs",
    "map_memory",
    "unmap_memory",
    "protect_memory",
    "lock_file",
    "unlock_file",
    "flush_cache",
    "clear_cache",
    "refresh",
    "rollback",
    "commit",
    "checkpoint",
    "restore",
    "snapshot",
    "throttle",
    "rate_limit",
    "retry",
    "timeout_set",
    "timeout_get",
    "quota_set",
    "quota_get",
    "permission_check",
    "user_lookup",
    "group_lookup",
    "capability_check",
    "policy_apply",
    "policy_remove",
  ],

  hard: [
    "async_await",
    "promise_resolve",
    "promise_reject",
    "callback_invoke",
    "coroutine_yield",
    "fiber_switch",
    "thread_spawn",
    "thread_join",
    "thread_detach",
    "mutex_trylock",
    "mutex_unlock",
    "semaphore_post",
    "semaphore_wait",
    "condvar_signal",
    "condvar_broadcast",
    "barrier_sync",
    "spinlock_acquire",
    "spinlock_release",
    "rwlock_upgrade",
    "rwlock_downgrade",
    "atomic_cas",
    "atomic_fetch_add",
    "memory_barrier_full",
    "memory_barrier_read",
    "memory_barrier_write",
    "page_scrub",
    "page_compact",
    "page_reclaim",
    "page_prefetch",
    "tlb_sweep",
    "mmu_rebind",
    "numa_shuffle",
    "numa_affinity_set",
    "cgroup_bind",
    "cgroup_unbind",
    "namespace_merge",
    "namespace_fork",
    "capability_grant",
    "capability_revoke",
    "sandbox_exec",
    "sandbox_enter",
    "sandbox_leave",
    "profile_start",
    "profile_stop",
    "trace_begin",
    "trace_end",
    "trace_export",
    "ring_submit",
    "ring_commit",
    "uring_magic",
    "bpf_attach",
    "bpf_detach",
    "sec_policy_load",
    "sec_policy_unload",
    "syscall_hook",
    "syscall_unhook",
    "kernel_patch",
    "kernel_unpatch",
    "hotplug_cpu",
    "hotunplug_cpu",
    "device_claim",
    "device_release",
    "driver_bind",
    "driver_unbind",
    "vm_snapshot",
    "vm_restore",
    "vm_migrate",
    "fs_journal_flush",
    "fs_journal_replay",
    "mount_repair",
    "mount_sanitize",
    "handle_rebind",
    "handle_invalidate",
  ],
} as const;

export type Difficulty = 'easy' | 'normal' | 'hard';

export interface QuestionData {
  correctAnswer: string;
  options: string[];
  difficulty: Difficulty;
}

// 問題を生成する関数
export function generateQuestion(difficulty: Difficulty, usedSyscalls: Set<string>): QuestionData {
  const availableSyscalls = syscalls[difficulty].filter(s => !usedSyscalls.has(s));
  
  if (availableSyscalls.length === 0) {
    // 使用済みをリセット
    usedSyscalls.clear();
    return generateQuestion(difficulty, usedSyscalls);
  }

  const correctAnswer = availableSyscalls[Math.floor(Math.random() * availableSyscalls.length)];
  usedSyscalls.add(correctAnswer);

  // ダミー選択肢を2つ選ぶ
  const availableDummies = [...dummyOptions[difficulty]];
  const dummy1 = availableDummies.splice(Math.floor(Math.random() * availableDummies.length), 1)[0];
  const dummy2 = availableDummies.splice(Math.floor(Math.random() * availableDummies.length), 1)[0];

  // 選択肢をシャッフル
  const options = [correctAnswer, dummy1, dummy2].sort(() => Math.random() - 0.5);

  return {
    correctAnswer,
    options,
    difficulty
  };
}
