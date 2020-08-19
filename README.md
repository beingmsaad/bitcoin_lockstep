# Bitcoin Lockstep Synchronous



Cloned from Bitcoin Core, Bitcoin Lockstep Synchronous closely models the Bitcoin ideal functionality and counters the HashSplit attack . Currently, Bitcoin Lockstep Synchronous is anonymized for review.  

# New Features!

  - Connects to all reachable nodes and detects mining nodes
  - Detects concurrent mining on branches of the public blockchain
  - Reduces block propagation delay

What is Bitcoin?
----------------

Bitcoin is an experimental digital currency that enables instant payments to
anyone, anywhere in the world. Bitcoin uses peer-to-peer technology to operate
with no central authority: managing transactions and issuing money are carried
out collectively by the network. Bitcoin Core is the name of open source
software which enables the use of this currency.

For more information, as well as an immediately useable, binary version of
the Bitcoin Core software, see https://bitcoincore.org/en/download/, or read the
[original whitepaper](https://bitcoincore.org/bitcoin.pdf).

License
-------

Bitcoin Core is released under the terms of the MIT license. See [COPYING](COPYING) for more
information or see https://opensource.org/licenses/MIT.

Development Process
-------------------

The `master` branch is regularly built and tested, but is not guaranteed to be
completely stable. [Tags](https://github.com/bitcoin/bitcoin/tags) are created
regularly to indicate new official, stable release versions of Bitcoin Core.

The contribution workflow is described in [CONTRIBUTING.md](CONTRIBUTING.md)
and useful hints for developers can be found in [doc/developer-notes.md](doc/developer-notes.md).

Testing
-------

Testing and code review is the bottleneck for development; we get more pull
requests than we can review and test on short notice. Please be patient and help out by testing
other people's pull requests, and remember this is a security-critical project where any mistake might cost people
lots of money.

### Automated Testing

Developers are strongly encouraged to write [unit tests](src/test/README.md) for new code, and to
submit new unit tests for old code. Unit tests can be compiled and run
(assuming they weren't disabled in configure) with: `make check`. Further details on running
and extending unit tests can be found in [/src/test/README.md](/src/test/README.md).

There are also [regression and integration tests](/test), written
in Python, that are run automatically on the build server.
These tests can be run (if the [test dependencies](/test) are installed) with: `test/functional/test_runner.py`

The Travis CI system makes sure that every pull request is built for Windows, Linux, and macOS, and that unit/sanity tests are run automatically.

### Manual Quality Assurance (QA) Testing

Changes should be tested by somebody other than the developer who wrote the
code. This is especially important for large or high-risk changes. It is useful
to add a test plan to the pull request description if testing the changes is
not straightforward.

Translations
------------

Changes to translations as well as new translations can be submitted to
[Bitcoin Core's Transifex page](https://www.transifex.com/bitcoin/bitcoin/).

Translations are periodically pulled from Transifex and merged into the git repository. See the
[translation process](doc/translation_process.md) for details on how this works.



### Required Packages

Bitcoin Lockstep Synchronous  uses a number of open source projects to work properly. Currently, it is in the testing phase and supports Linux only.

* [NodeJS] - Connects between RPC API and Bitcoin node
* [GNU Parallel] - Making faster connectivity
.

### Installing Scripts

* Make and install Bitcoin using instructions in the Makefile. 
* Install NodeJS and NPM. Oen scripts directory. ABitcoin.conf file is provided in this directory. 
* Replace your Bitcoin.conf with the given file and set RPC username and password. 
* Install GNU parallel (https://www.gnu.org/software/parallel/) and make sure to test it before proceeding further. Appropriately cite them for their work. Parallel is a great tool
* Run the following commands    

```sh
$ npm install request
$ npm install bitcoin-rpc-promise
$ npm install sleep
$ npm install shelljs
```

* Execute node reachable.js once. You can run it multiple times if your connection count is low (check connection count by entering (bitcoin-cli getconnectioncount) on your terminal. However, one execution is sufficient.
* Once reachable.js has completed, execute goodnodes.js once (node goodnodes.js). It will run forever. Better run it in the background.


