class Ccost < Formula
  desc "Coinbase Coin Cost Match"
  homepage "https://github.com/helenamerk/ccost"
  url "https://github.com/helenamerk/homebrew-ccost/releases/download/v1.0.0/ccost-macos-x64.tar.gz"
  sha256 "8032c9e87e8771f472f722ef875d0346959e30ec489feb01d5d6e7bf866924ea"
  version "1.0.0"
  def install
    bin.install "ccost"
  end
end
