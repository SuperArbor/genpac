# -*- coding: utf-8 -*-
from __future__ import (unicode_literals, absolute_import,
                        division, print_function)
import pytest

from genpac import run
from tests.util import buildenv, join_etc, join_tmp, is_not_own
from tests.util import parametrize, skipif, xfail

@parametrize('cfg', [
    join_etc('config.ini')])
def test_run_by_config(cfg):
    with buildenv(argv=['-c', cfg]):
        run()


@parametrize('argv', [
    skipif(is_not_own, reason='proxy')(
        ['--format', 'dnsmasq', '--gfwlist-proxy', 'SOCKS5 127.0.0.1:1080', '-o/dev/null']),
        '--format dnsmasq --gfwlist-disabled -o/dev/null',
        '--format dnsmasq --gfwlist-disabled -o-',
        '--format dnsmasq --gfwlist-url=- --gfwlist-local={} -o/dev/null'.format(join_etc('gfwlist.txt')),
        '--format dnsmasq -o/dev/null --user-rule-from=,,'
    ])
def test_run_by_argv(argv, capsys):
    with buildenv(argv=argv.args[1], kwargs=argv.kwargs):
        run()


@xfail(raises=SystemExit)
@parametrize('argv', [
    ['--init', join_tmp('init')],
    '-c missing-file',  # 配置文件丢失
    '',  # 空参数 格式丢失
    '--format missing-format',  # 格式错误 命令行
    ['-c', join_etc('config-missing-fmt.ini')],  # 格式错误 配置文件
    '--format pac',  # pac格式未指定pac-proxy
    '--format dnsmasq --user-rule-from=missing-file',  # 用户规则文件丢失
    '--format dnsmasq --gfwlist-url=missing-url',
    '--format dnsmasq --gfwlist-proxy=error-proxy -o /dev/null',
    '--format dnsmasq --gfwlist-disabled -o missing/path/file',
    '--format dnsmasq --gfwlist-url=- --gfwlist-local=missing.txt -o/dev/null',
    '--format dnsmasq --gfwlist-url=- --gfwlist-local={} -o/dev/null'.format(join_etc('gfwlist-error.txt'))
    ])
def test_run_sysexit(argv):
    with buildenv(argv=argv):
        run()
