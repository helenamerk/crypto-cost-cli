class Ccost < Formula
  desc "Coinbase Coin Cost Match"
  homepage "https://github.com/helenamerk/ccost"
  url "https://github.com/helenamerk/homebrew-ccost/releases/download/latest/ccost-macos-x64.tar.gz"
  sha256 "738da2630be861205bf1f1106830f7186accf222c4b88606d6146f75fc57efe0"
  version "1.0.0"
  def install
    bin.install "ccost"
  end
end
